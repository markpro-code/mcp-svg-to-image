# MCP SVG to Image - Quick Start

## ✅ Installation Complete!

The MCP SVG to Image server has been successfully installed and configured.

## 📍 Location

```
/Users/mark/.config/opencode/mcp/svg-to-image/
```

## ⚙️ Configuration

The MCP server has been added to your configurations:

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "node",
      "args": ["/Users/mark/.config/opencode/mcp/svg-to-image/index.js"]
    }
  }
}
```

**OpenCode** (`~/.config/opencode/opencode.json`):
```json
{
  "mcp": {
    "mcp-svg-to-image": {
      "type": "local",
      "command": ["node", "/Users/mark/.config/opencode/mcp/svg-to-image/index.js"]
    }
  }
}
```

## 🚀 Next Steps

### 1. Restart Your MCP Client

**You must restart your MCP-compatible client (Cursor, OpenCode, Claude Desktop, etc.) for the MCP server to be loaded.**

Close all windows and restart the application.

### 2. Verify Installation

After restarting, the MCP server should be active. You can verify by looking at the MCP servers list in your client's settings.

### 3. Start Using It!

Once Cursor is restarted, you can:

**Automatic Detection:**
- Open any SVG file and ask questions about it
- The LLM will automatically convert it to see the visual content

**Manual Conversion:**
```
"Convert /path/to/image.svg to PNG and show me what it looks like"
"Analyze the design of logo.svg"
"What colors are used in diagram.svg?"
```

## 🛠️ Tool Parameters

The MCP server provides the `convert_svg_to_image` tool with these parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `svg_path` | string | *required* | Absolute path to SVG file |
| `output_format` | enum | `"png"` | Output format: "png", "jpeg", or "webp" |
| `width` | number | `1920` | Output width in pixels |
| `height` | number | *optional* | Output height (maintains aspect ratio if omitted) |
| `background` | string | `"transparent"` | Background: "transparent", "white", or "#hex" |

## 📚 Examples

**Convert to PNG:**
```
Convert /Users/mark/Documents/logo.svg to PNG
```

**Convert with white background:**
```
Convert diagram.svg to JPEG with white background
```

**Convert at specific size:**
```
Convert icon.svg to PNG at 512px width
```

## 🧪 Technical Details

- **Engine**: Sharp (high-performance image processing)
- **Formats**: PNG, JPEG, WebP
- **Max Width**: 1920px (default)
- **Compression**: Optimized for quality and size

## 🐛 Troubleshooting

### Server doesn't appear after restart
- Double-check `~/.cursor/mcp.json` configuration
- Verify the path to `index.js` is correct
- Check Cursor's MCP logs for errors

### Conversion fails
- Ensure you use absolute paths (not relative)
- Verify the SVG file is valid XML
- Check file permissions

### Need to reinstall
```bash
cd /Users/mark/.config/opencode/mcp/svg-to-image
npm install
```

## 📖 Additional Documentation

- `README.md` - Detailed documentation
- `SETUP.md` - Installation guide
- `package.json` - Dependencies and scripts

---

**Status**: ✅ Ready to use (after Cursor restart)  
**Version**: 1.0.0  
**Last Updated**: Jan 29, 2026
