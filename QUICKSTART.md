# MCP SVG to Image - Quick Start

## 📦 Installation

Install the MCP server globally via npm:

```bash
npm install -g mcp-svg-to-image
```

Or use with npx (no installation required):

```bash
npx mcp-svg-to-image
```

## ⚙️ Configuration

Add the MCP server to your client configuration:

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

**If installed globally:**
```json
{
  "mcpServers": {
    "mcp-svg-to-image": {
      "command": "mcp-svg-to-image"
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
- Double-check your MCP client configuration file
- Verify npm/npx is in your PATH
- Check your client's MCP logs for errors
- Try restarting your client application

### Conversion fails
- Ensure you use absolute paths (not relative)
- Verify the SVG file is valid XML
- Check file permissions

### Need to reinstall or update
```bash
npm install -g mcp-svg-to-image@latest
```

Or clear npx cache:
```bash
npx clear-npx-cache
npx -y mcp-svg-to-image
```

## 📖 Additional Resources

- [GitHub Repository](https://github.com/markpro-code/mcp-svg-to-image)
- [npm Package](https://www.npmjs.com/package/mcp-svg-to-image)
- [Report Issues](https://github.com/markpro-code/mcp-svg-to-image/issues)

---

**Version**: 1.0.0  
**License**: MIT  
**Last Updated**: Jan 29, 2026
