#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Create MCP server
const server = new McpServer(
  {
    name: 'mcp-svg-to-image',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register the SVG converter tool
server.registerTool(
  'convert_svg_to_image',
  {
    description: 'Convert SVG file to raster image format (PNG/JPEG/WebP) for visual analysis. The converted image will be returned so the LLM can see and analyze the visual content of the SVG.',
    inputSchema: {
      svg_path: z.string().describe('Absolute path to the SVG file to convert'),
      output_format: z
        .enum(['png', 'jpeg', 'webp'])
        .default('png')
        .describe('Output image format (default: png)'),
      width: z
        .number()
        .default(1920)
        .describe(
          'Output width in pixels (default: 1920). Height will be calculated to maintain aspect ratio if not specified.'
        ),
      height: z
        .number()
        .optional()
        .describe(
          'Output height in pixels (optional). If not specified, will maintain aspect ratio based on width.'
        ),
      background: z
        .string()
        .default('transparent')
        .describe(
          'Background color: "transparent", "white", or hex color like "#ffffff" (default: transparent)'
        ),
    },
  },
  async ({ svg_path, output_format, width, height, background }) => {
    try {
      // Validate SVG file exists
      await fs.access(svg_path);

      // Read SVG to check if it's valid
      const svgContent = await fs.readFile(svg_path);

      // Generate output path in temp directory
      const tempDir = os.tmpdir();
      const basename = path.basename(svg_path, '.svg');
      const timestamp = Date.now();
      const outputPath = path.join(
        tempDir,
        `${basename}_${timestamp}.${output_format}`
      );

      // Convert using sharp
      let sharpInstance = sharp(svgContent);

      // Set resize options
      if (width || height) {
        const resizeOptions = {
          fit: 'inside',
          withoutEnlargement: false,
        };

        // Handle background color
        if (background !== 'transparent') {
          if (background === 'white') {
            resizeOptions.background = { r: 255, g: 255, b: 255, alpha: 1 };
          } else if (background.startsWith('#')) {
            // Parse hex color
            const hex = background.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            resizeOptions.background = { r, g, b, alpha: 1 };
          }
        } else {
          resizeOptions.background = { r: 0, g: 0, b: 0, alpha: 0 };
        }

        sharpInstance = sharpInstance.resize(width, height, resizeOptions);
      }

      // Set output format
      if (output_format === 'png') {
        sharpInstance = sharpInstance.png({ compressionLevel: 9 });
      } else if (output_format === 'jpeg') {
        sharpInstance = sharpInstance.jpeg({ quality: 90 });
      } else if (output_format === 'webp') {
        sharpInstance = sharpInstance.webp({ quality: 90 });
      }

      // Save to file
      await sharpInstance.toFile(outputPath);

      // Get metadata for the output
      const metadata = await sharp(outputPath).metadata();

      // Read the converted file as base64
      const imageBuffer = await fs.readFile(outputPath);
      const base64Image = imageBuffer.toString('base64');

      return {
        content: [
          {
            type: 'text',
            text: `Successfully converted SVG to ${output_format.toUpperCase()}\n\nInput: ${svg_path}\nOutput: ${outputPath}\nDimensions: ${metadata.width}x${metadata.height}px\nFormat: ${output_format}\n\nThe converted image is attached below for visual analysis.`,
          },
          {
            type: 'image',
            data: base64Image,
            mimeType: `image/${output_format}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error converting SVG: ${error.message}\n\nPlease ensure:\n1. The file path is correct and accessible\n2. The file is a valid SVG\n3. Sharp can parse the SVG format`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log to stderr so it doesn't interfere with MCP communication
  console.error('MCP SVG to Image server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
