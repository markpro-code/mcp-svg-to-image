#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { convertSvgToImage } from './converter.js';

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
  async (params) => {
    return await convertSvgToImage(params);
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
