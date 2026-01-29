import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { convertSvgToImage } from '../converter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import sharp from 'sharp';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.join(__dirname, 'fixtures');
const simpleSvgPath = path.join(fixturesDir, 'simple.svg');
const complexSvgPath = path.join(fixturesDir, 'complex.svg');
const invalidSvgPath = path.join(fixturesDir, 'invalid.svg');

// Track created files for cleanup
const createdFiles = [];

afterEach(async () => {
  // Clean up created files
  for (const file of createdFiles) {
    try {
      await fs.unlink(file);
    } catch (error) {
      // Ignore errors if file doesn't exist
    }
  }
  createdFiles.length = 0;
});

describe('convert_svg_to_image', () => {
  describe('Format Conversion Tests', () => {
    it('should convert SVG to PNG (default format)', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
      });

      expect(result.isError).toBeUndefined();
      expect(result.content).toHaveLength(2);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Successfully converted SVG to PNG');
      expect(result.content[1].type).toBe('image');
      expect(result.content[1].mimeType).toBe('image/png');
      expect(result.content[1].data).toBeTruthy();
      expect(typeof result.content[1].data).toBe('string');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should convert SVG to JPEG', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        output_format: 'jpeg',
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toContain('Successfully converted SVG to JPEG');
      expect(result.content[1].mimeType).toBe('image/jpeg');
      expect(result.metadata.format).toBe('jpeg');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should convert SVG to WebP', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        output_format: 'webp',
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toContain('Successfully converted SVG to WEBP');
      expect(result.content[1].mimeType).toBe('image/webp');
      expect(result.metadata.format).toBe('webp');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });
  });

  describe('Dimension Tests', () => {
    it('should use default width (1920px) with auto height', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata.width).toBeLessThanOrEqual(1920);
      expect(result.metadata.height).toBeGreaterThan(0);
      expect(result.content[0].text).toContain('1920');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should convert with custom width and maintain aspect ratio', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        width: 800,
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata.width).toBeLessThanOrEqual(800);
      expect(result.metadata.height).toBeGreaterThan(0);

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should convert with custom width and height specified', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        width: 400,
        height: 300,
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata.width).toBeLessThanOrEqual(400);
      expect(result.metadata.height).toBeLessThanOrEqual(300);

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should handle complex SVG with custom dimensions', async () => {
      const result = await convertSvgToImage({
        svg_path: complexSvgPath,
        width: 1024,
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata.width).toBeLessThanOrEqual(1024);
      expect(result.content[0].text).toContain('Successfully converted');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });
  });

  describe('Background Color Tests', () => {
    it('should use transparent background (default)', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        output_format: 'png',
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata.hasAlpha).toBe(true);

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should use white background', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        background: 'white',
        output_format: 'png',
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toContain('Successfully converted');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should use hex color background', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        background: '#ff0000',
        output_format: 'png',
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toContain('Successfully converted');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should handle hex color with different formats', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        background: '#00ff00',
        output_format: 'png',
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toContain('Successfully converted');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle non-existent file path', async () => {
      const result = await convertSvgToImage({
        svg_path: '/path/to/nonexistent/file.svg',
      });

      expect(result.isError).toBe(true);
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error converting SVG');
    });

    it('should handle invalid SVG content', async () => {
      const result = await convertSvgToImage({
        svg_path: invalidSvgPath,
      });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error converting SVG');
    });

    it('should handle missing svg_path parameter', async () => {
      const result = await convertSvgToImage({
        svg_path: undefined,
      });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error converting SVG');
    });
  });

  describe('Output Validation Tests', () => {
    it('should create output file in temp directory', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
      });

      expect(result.isError).toBeUndefined();
      expect(result.outputPath).toBeTruthy();
      expect(result.outputPath).toContain(os.tmpdir());

      // Verify file exists
      const fileExists = await fs
        .access(result.outputPath)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should validate image metadata', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
        width: 500,
      });

      expect(result.isError).toBeUndefined();
      expect(result.metadata).toBeDefined();
      expect(result.metadata.width).toBeDefined();
      expect(result.metadata.height).toBeDefined();
      expect(result.metadata.format).toBe('png');
      expect(result.metadata.width).toBeLessThanOrEqual(500);

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should return valid base64 image data', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
      });

      expect(result.isError).toBeUndefined();
      expect(result.content[1].data).toBeTruthy();

      // Verify base64 is valid
      const base64Regex = /^[A-Za-z0-9+/=]+$/;
      expect(base64Regex.test(result.content[1].data)).toBe(true);

      // Verify base64 can be decoded and is a valid image
      const buffer = Buffer.from(result.content[1].data, 'base64');
      expect(buffer.length).toBeGreaterThan(0);

      const metadata = await sharp(buffer).metadata();
      expect(metadata.format).toBe('png');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });

    it('should have correct response content structure', async () => {
      const result = await convertSvgToImage({
        svg_path: simpleSvgPath,
      });

      expect(result.isError).toBeUndefined();
      expect(result.content).toBeInstanceOf(Array);
      expect(result.content).toHaveLength(2);

      // Validate text content
      expect(result.content[0]).toHaveProperty('type', 'text');
      expect(result.content[0]).toHaveProperty('text');
      expect(result.content[0].text).toContain('Successfully converted');
      expect(result.content[0].text).toContain('Input:');
      expect(result.content[0].text).toContain('Output:');
      expect(result.content[0].text).toContain('Dimensions:');

      // Validate image content
      expect(result.content[1]).toHaveProperty('type', 'image');
      expect(result.content[1]).toHaveProperty('data');
      expect(result.content[1]).toHaveProperty('mimeType');

      if (result.outputPath) {
        createdFiles.push(result.outputPath);
      }
    });
  });
});
