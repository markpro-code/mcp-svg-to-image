# Setup Guide - MCP SVG to Image

## Installation

### Option 1: Using npx (Recommended)

No installation required. The MCP server will be downloaded on-demand:

1. Add to your MCP client configuration
2. The package will be fetched automatically when needed

### Option 2: Global Installation

Install the package globally:

```bash
npm install -g mcp-svg-to-image
```

## Configuration

Add the MCP server to your client's configuration file:

### Cursor Configuration

Edit `~/.cursor/mcp.json`:

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

Or if installed globally:

```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "mcp-svg-to-image"
    }
  }
}
```

### Claude Desktop Configuration

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

## Next Steps

1. **Restart Your MCP Client**
   - Close and restart Cursor, Claude Desktop, or your MCP-compatible client
   - This is required for the configuration changes to take effect

2. **Verify Installation**
   - Check your client's MCP servers list
   - The server should appear as "mcp-svg-to-image"
   - Look for any error messages in the MCP logs

3. **Test the Tool**
   - Try converting an SVG file:
     ```
     "Convert /path/to/your/file.svg to PNG"
     ```

## Usage

Once configured, the LLM can automatically detect SVG files and convert them for visual analysis. You can also explicitly request conversion:

**Examples:**
- "Convert this SVG to PNG and show me what it looks like"
- "Analyze the visual design of logo.svg"
- "What colors are used in diagram.svg?"

**Tool Parameters:**
- `svg_path` (required): Absolute path to SVG file
- `output_format`: "png" (default), "jpeg", or "webp"
- `width`: Width in pixels (default: 1920)
- `height`: Height in pixels (optional, maintains aspect ratio)
- `background`: "transparent" (default), "white", or hex color

## Troubleshooting

### Server doesn't appear after restart
- Verify your MCP configuration file syntax is correct
- Ensure npm/npx is installed and in your PATH
- Check your client's MCP logs for error messages
- Try manually running: `npx mcp-svg-to-image` to see any errors

### Conversion fails
- Use absolute paths for SVG files (not relative paths)
- Verify the SVG file is valid XML
- Check file permissions
- Look for error messages in your client's logs

### npx is slow to start
- Consider installing globally: `npm install -g mcp-svg-to-image`
- Update configuration to use the global installation

### Permission errors
- On Unix systems, ensure npm global bin is in PATH
- Try: `npm config get prefix` to check npm global location

## Updating

Update to the latest version:

```bash
# If using npx (clear cache first)
npx clear-npx-cache
# Will fetch latest version on next run

# If installed globally
npm update -g mcp-svg-to-image
```

## Uninstallation

Remove the MCP server:

1. Remove the `mcp-svg-to-image` entry from your MCP configuration file
2. If installed globally: `npm uninstall -g mcp-svg-to-image`
3. Restart your MCP client

## Requirements

- Node.js >= 18.0.0
- npm or npx
- MCP-compatible client (Cursor, Claude Desktop, etc.)
