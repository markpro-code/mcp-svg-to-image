# Setup Guide - MCP SVG to Image

## Installation Status

✅ **Installed Successfully!**

The MCP server has been created and configured at:
- **Location**: `/Users/mark/.config/opencode/mcp/svg-to-image/`
- **Configuration**: Added to `~/.cursor/mcp.json` and `opencode.json`

## Configuration

The following has been added to your global Cursor MCP configuration (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "bash",
      "args": [
        "-c",
        "cd /Users/mark/.config/opencode/mcp/svg-to-image && node index.js"
      ]
    }
  }
}
```

**Note**: The `cd` command is required so Node.js can find the `package.json` file and recognize the ES module format.

## Next Steps

1. **Restart Cursor** - You need to restart Cursor for the new MCP server to be loaded

2. **Verify Installation** - After restart, you can check if the MCP server is running by:
   - Looking at the MCP servers list in Cursor
   - The server should appear as "opencode-svg-converter"

3. **Test the Tool** - Try converting an SVG file:
   ```
   Ask the LLM: "Convert this SVG file to PNG: /path/to/your/file.svg"
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

### Server doesn't appear in Cursor
- Make sure you restarted Cursor completely
- Check `~/.cursor/mcp.json` for correct configuration
- Verify the path to index.js is correct

### Conversion fails
- Ensure the SVG file path is absolute (not relative)
- Check that the SVG file is valid XML
- Look for error messages in Cursor's MCP logs

### Dependencies missing
```bash
cd /Users/mark/.config/opencode/mcp/svg-to-image
npm install
```

## Updating

To update dependencies:
```bash
cd /Users/mark/.config/opencode/mcp/svg-to-image
npm update
```

## Uninstallation

To remove the MCP server:
1. Remove the `mcp-svg-to-image` entry from your MCP configuration
2. Delete the directory: `/Users/mark/.config/opencode/mcp/svg-to-image/`
3. Restart your MCP client
