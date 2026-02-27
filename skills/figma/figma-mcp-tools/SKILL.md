# Figma MCP Tools Skill

Use this skill when working with Figma designs, creating or modifying design elements, managing design tokens, or exporting design assets.

## Prerequisites

1. **Build the MCP server** (if not already built):
   ```bash
   cd tools/cursor-figma-mcp && npm install && npm run build
   ```

2. **Configure Cursor MCP** (`~/.cursor/mcp.json`):
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "node",
         "args": ["/path/to/mobile-apps/tools/cursor-figma-mcp/dist/index.js"]
       }
     }
   }
   ```

3. **Restart Cursor** to load the MCP server.

## Connection

Always connect before using any Figma tools:

```
figma_connect              # Yolo mode (recommended, patches Figma)
figma_connect(mode: "safe") # Safe mode (requires plugin running)
```

Check status: `figma_status`

## Available Tool Categories

### Element Creation
- `create_frame` - Frames with auto-layout
- `create_text` - Text with font styling
- `create_rectangle`, `create_ellipse`, `create_line` - Shapes
- `create_component`, `create_instance` - Components

### Modification
- `set_fill`, `set_stroke` - Colors
- `set_corner_radius` - Rounding
- `set_text`, `set_font` - Typography
- `resize`, `move` - Dimensions
- `set_auto_layout` - Layout
- `rename`, `delete_node`, `duplicate`

### Query
- `list_nodes`, `find_nodes` - Browse canvas
- `get_node` - Node details
- `get_selection` - Current selection

### Design Tokens
- `create_variable_collection` - Collections with modes
- `create_variable` - Variables (COLOR, FLOAT, STRING, BOOLEAN)
- `bind_variable` - Bind to node properties
- `create_tailwind_colors` - Full Tailwind palette

### Bulk Operations
- `batch_rename` - Pattern-based renaming
- `find_replace_text` - Text find/replace
- `batch_set_fill`, `batch_set_stroke` - Batch styling
- `select_same` - Select matching nodes

### Export
- `export_png`, `export_svg` - Image export
- `export_css_variables` - CSS custom properties
- `export_tailwind_config` - Tailwind config

### Lint & Accessibility
- `lint_design` - Run design rules
- `check_contrast` - WCAG contrast
- `check_touch_targets` - 44x44 minimum
- `check_text_size` - Minimum text size
- `analyze_colors`, `analyze_typography` - Design analysis

## Integration with Harmonized Design System

This skill works alongside the `figma-to-harmonized` agent:

1. **MCP tools**: Raw Figma read/write access
2. **figma-to-harmonized agent**: Maps Figma to Harmonized widgets

### Workflow Example

```
# 1. Connect to Figma
figma_connect

# 2. Inspect the design
list_nodes(type: "FRAME")
get_node(nodeId: "...", includeChildren: true)

# 3. Check accessibility before implementing
check_contrast(level: "AA")
check_touch_targets(minSize: 44)

# 4. Export tokens for reference
export_css_variables(prefix: "--figma-")

# 5. Use figma-to-harmonized agent for widget mapping
# (The agent will read the Figma design and suggest Harmonized widgets)
```

## Common Patterns

### Create a Card Component
```
create_frame(name: "Card", autoLayout: "vertical", gap: 16, padding: 24, fill: "#FFFFFF", cornerRadius: 12)
create_text(content: "Title", fontSize: 20, fontWeight: 600)
create_text(content: "Description", fontSize: 14, fill: "#666666")
```

### Set Up Design Tokens
```
create_variable_collection(name: "Theme", modes: ["Light", "Dark"])
create_variable(collectionId: "...", name: "colors/background", type: "COLOR", 
  value: "#FFFFFF", modeValues: { "Light": "#FFFFFF", "Dark": "#1A1A1A" })
```

### Batch Operations
```
batch_rename(pattern: "Card-{n}", startNumber: 1)
find_replace_text(find: "Login", replace: "Sign In")
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not connected to Figma" | Run `figma_connect` |
| "Node not found" | Verify ID with `list_nodes` |
| Connection timeout | Ensure Figma Desktop is running with a file open |
| Permission denied (macOS) | Grant Full Disk Access to Terminal |
