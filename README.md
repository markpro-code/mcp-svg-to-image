# MCP SVG to Image

[![npm version](https://badge.fury.io/js/mcp-svg-to-image.svg)](https://www.npmjs.com/package/mcp-svg-to-image)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for converting SVG files to raster images (PNG/JPEG/WebP) so that LLMs can visually analyze SVG content.

## Features

- Convert SVG files to PNG, JPEG, or WebP formats
- Configurable dimensions and background colors
- Fast conversion using Sharp library
- Returns converted image directly for LLM analysis

## Installation

Install globally via npm:

```bash
npm install -g mcp-svg-to-image
```

Or use with npx (no installation required):

```bash
npx mcp-svg-to-image
```

## Configuration

Add this MCP server to your MCP-compatible client configuration:

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "npx",
      "args": ["-y", "mcp-svg-to-image"]
    }
  }
}
```

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "npx",
      "args": ["-y", "mcp-svg-to-image"]
    }
  }
}
```

**Alternative (if installed globally):**
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "mcp-svg-to-image"
    }
  }
}
```

## Usage

The MCP server provides one tool:

### `convert_svg_to_image`

Converts an SVG file to a raster image format.

**Parameters:**
- `svg_path` (required): Absolute path to the SVG file
- `output_format` (optional): Output format - "png", "jpeg", or "webp" (default: "png")
- `width` (optional): Output width in pixels (default: 1920)
- `height` (optional): Output height in pixels (maintains aspect ratio if not specified)
- `background` (optional): Background color - "transparent", "white", or hex like "#ffffff" (default: "transparent")

**Example:**

```javascript
{
  "name": "convert_svg_to_image",
  "arguments": {
    "svg_path": "/path/to/image.svg",
    "output_format": "png",
    "width": 1920,
    "background": "transparent"
  }
}
```

**Returns:**
- Text message with conversion details
- Base64-encoded image that the LLM can analyze visually

## How It Works

1. Reads the SVG file from the specified path
2. Uses Sharp library to render the SVG
3. Converts to the specified raster format
4. Returns the converted image for visual analysis

## Requirements

- Node.js >= 18.0.0
- npm or npx

## Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for building MCP servers
- `sharp`: High-performance image processing library
- `zod`: TypeScript-first schema validation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any problems, please [file an issue](https://github.com/markpro-code/mcp-svg-to-image/issues) on GitHub.

## License

MIT

## Related

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
