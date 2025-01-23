# Layout Aware Renaming Plugin

*Automatically rename elements based on their grid layout.*

---

## Features
- **Auto-Detect Grids**: Automatically detects rows and columns in your selection.
- **Custom Naming**: Add prefixes and choose between numeric or alphabetic suffixes.
- **Manual Override**: Specify exact rows/columns when auto-detection fails.
- **Mixed Sizes**: Works with elements of different sizes in the same grid.
- **Figma & FigJam**: Compatible with both Figma and FigJam (limited support).

---

## How It Works
1. Select elements arranged in a grid.
2. Run the plugin.
3. Choose your naming preferences:
   - **Prefix**: Add a custom prefix (e.g., "Item-")
   - **Suffix**: Use numbers (1, 2, 3) or letters (A, B, C)
4. Let the plugin rename your elements!

---

## Installation
1. Open the plugin in the Figma Community: [Install Plugin](#)
2. Click **"Try it out"** to add it to your Figma account.

---

## Usage
### Auto-Detect Mode
1. Select elements in a grid layout.
2. Run the plugin.
3. Enable **Auto Detect Grid**.
4. Enter a prefix and choose a suffix type.
5. Click **Rename Elements**.

### Manual Mode
1. Select elements.
2. Run the plugin.
3. Disable **Auto Detect Grid**.
4. Enter the number of rows and columns.
5. Click **Rename Elements**.

---

## Examples
### Before
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Rect 4  │ │ Rect 5  │ │ Rect 2  │
└─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Rect 1  │ │ Rect 3  │ │ Rect 6  │
└─────────┘ └─────────┘ └─────────┘
```
### After (Prefix: "Item-", Suffix: Numbers)
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Item-1  │ │ Item-2  │ │ Item-3  │
└─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Item-4  │ │ Item-5  │ │ Item-6  │
└─────────┘ └─────────┘ └─────────┘
```
### After (Prefix: "Section-", Suffix: Letters)
```
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Section-A  │ │ Section-B  │ │ Section-C  │
└────────────┘ └────────────┘ └────────────┘
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Section-D  │ │ Section-E  │ │ Section-F  │
└────────────┘ └────────────┘ └────────────┘
```
---

## Support
- **Issues**: Report bugs or request features on [GitHub](https://github.com/dlnash96/Layout-Aware-Renaming).

---

## Changelog
### v1.0.0 (Initial Release)
- Auto-detect grid layouts
- Custom prefix and suffix options
- Manual grid input fallback
- Figma and FigJam support

---

## License
This plugin is open-source and available under the [MIT License](https://opensource.org/license/mit).

---

## About the Author
Created by David Nash.  
Connect with me:
- [LinkedIn](https://www.linkedin.com/in/hiredavidnash/) 