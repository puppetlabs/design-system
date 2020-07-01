## Requirements

It is the responsibility of the designer to ensure all criteria are met for a smooth handoff to development.

A successful design meets the following criteria:

1. The component fills a unique role that would be difficult to meet using existing components
2. Documentation is thorough, and specs have been reviewed and approved by engineering as complete
3. The design has been reviewed and meets all necessary design criteria

## Documentation

It is critical that component are well documented before a component is considered complete and ready to share across Puppet.

Documentation must include:

- General description
- Use cases
- Examples and options
- Specs for development
- States and interactions
- Define extension & customization options
- Reference dependencies
- A change log for improvements or changes

## Design criteria

Consider all of the following:

- **UI states**: (eg. active, hover, pressed, disabled, focused, loading)
- **Interaction**: (eg. clicking reveals a menu, typing begins an auto-complete)
- **Scale and Size**: consider how another designer might resize, or how it would change size in the browser or based on content. Define widths (min, max, default set/Anima/autosizing). Lock positions when needed.
- **Re-use**: how flexible is it to use within other patterns or next to other components
- **Customization limits**: In general we try to reduce customization options to just those available within code. Ensure appropriate overrides are available or off
- **Naming**: should mirror component names in code wherever possible
- **Layer & text styles**: Avoid direct styling of text and shapes. Call
- **Accessibility**: Must meet WCAG 2.0 guidelines for AA

## Layers

- **Organization**: Layers are organized visually, left to right and top to bottom.
- **Naming**: Rename layers to match the needs of symbol overrides. eg. Text layers in a form input are individually named "Label", "Input text", and "Placeholder". A name of "Background" is useful, where as "Rectangle" is not.
- **Hints**: Layer names may include hints to guide the user, such as ‘initital state’ or ‘do not resize’
- **Groups**: Group layers together for easier selection and manipulation. Grouping also directly impact how scaling behaves.

## Symbols

Most components eventually become symbols that become part of the Sketch library.

### Symbol names

- Follow existing naming conventions where possible.
- The name determines where it sits in the symbol menu's order. A forward slash (/) tells Sketch to use a folder structure.

### UI states & variations

Variations to state or layout, such as hover or focus, should be created as separate symbols. This allows them to be easily swapped out.

- Variations should be instances of the base symbol with overrides applied.
- All variations should be the same dimensions. Sketch interprets symbols with the same dimension as being hot-swappable.

**Example**: When creating the hover state for a button, place the default button symbol in the Hover symbols artboard. Use an override to change the appropriate colors. In the symbol menu, lock your overrides to prevent accidental changes by other designers.

### Acceptance checklist:

- Has it been made a symbol?
- Are all UI states made into symbols?
- Are all UI states or other variations the same size?
- Is it accessible?
- Is it i18n compatible?
- Are the layers named correctly?
- Are all layers using layer & text styles?
- Does it visually match patterns established in other symbols?
- Is it using nested symbols?
- Does this change impact other symbols or patterns already in use (eg updating a base button impacts other buttons)?
- Are any of the changes breaking to others?
- Does it require a new plugin?
- Are all shapes on the pixel grid (no subpixels)?
- Does it resize correctly?

## Spacing

All components should be aligned to our base 4px grid.

### Examples:

- 16px icons
- 4px between related buttons or interactive elements
- 8px between icons and content
- 16px between discrete elements in a row or column (eg. legend items in a chart)
- 16px gutter between content containers or cards

---

# Making updates

When updating symbols and styles within sketch be aware that removing layers will adversely affect downstream users. For instance if you need to change an existing text layer, do not delete it or replace it with a new layer. This breaks the connection to instances of that symbol in other files. Instead manipulate and adjust the existing layer to meet your needs. The same holds true for nested symbols, vector shapes, etc.

- Do not delete existing layers
- Use the replace function to swap out nested symbols
- Update layer names to reflect changes
- Update layer & text style definitions
- Document any breaking changes in your changelog - provide steps for remediation
