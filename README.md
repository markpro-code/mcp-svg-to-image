# MCP SVG to Image

MCP server for converting SVG files to raster images (PNG/JPEG/WebP) so that LLMs can visually analyze SVG content.

## Features

- Convert SVG files to PNG, JPEG, or WebP formats
- Configurable dimensions and background colors
- Fast conversion using Sharp library
- Returns converted image directly for LLM analysis

## Installation

```bash
cd /Users/mark/.config/opencode/mcp/svg-to-image
npm install
```

## Configuration

Add this MCP server to your MCP-compatible client configuration:

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "bash",
      "args": [
        "-c",
        "cd /path/to/mcp/svg-to-image && node index.js"
      ]
    }
  }
}
```

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "bash",
      "args": [
        "-c",
        "cd /path/to/mcp/svg-to-image && node index.js"
      ]
    }
  }
}
```

**Note**: Replace `/path/to/mcp/svg-to-image` with the actual installation path.

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

## Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for building MCP servers
- `sharp`: High-performance image processing library

## License

MIT
