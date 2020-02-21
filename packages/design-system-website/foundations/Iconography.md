Iconography is a crucial part of our visual language. When properly designed and implemented they fulfill multiple roles. They help users navigate an interface, emphasize content, provide additional context, and reflect our brand's theme.

Icon design sits squarely within a venn diagram between illustration and product design. Icons provide us a great creative opportunity while they must also clearly communicate their concept. They also have many technical constraints given their small size and the need to be consistent across dozens of icons.

A list of available icons are available in the [icon component](#/React%20Components/Icon).


## Icon construction

### Grid

By default our icons align to our 4px grid on a 16x16 artboard. We allow icons to be scaled up to 24x24.

![Merge icon on 16x16 grid](./icon-grid.svg)

When we reduce to 8x8, we always create a new icon. It is important that we remove non-critical detail as we scale down.

When scaling up to 24x24 consider creating a new icon, taking advantage of the larger space to add interesting and useful detail.

Icons are not scaled up over 24x24 pixels. If you need something larger use an illustration instead. Icons may be used as development placeholders, but should always be made into a more detailed illustration before being made public-facing.

![Example of reducing complexity when reducing size](./icon-size-complexity.svg)

## Pixel grid

Whole pixels are the smallest, most fundamental, aspect of our canvas for icon creation. All lines and shapes should align to the pixel grid as perfectly as possible. When creating icons it is _very important to utilize pixel preview_ so we can see a precise rendering of our icons.

All rules apply to hand-made icons at 8px, 16px, and 24px.

- Orthogonal (90º) lines should always be on the pixel grid (no subpixels)
- All strokes should be 2px thick.
- Provide at least 2px of space between lines whenever possible. 1px of space is acceptable for 8px icons.
- Rounded corners, joins, and terminals (unless it reduces legibility of the icon).
- Icons do not need to take up the entire canvas. Focus instead on legibility and a proper silhouette to communicate individual purpose.
- The dominant object should be aligned to the middle of the canvas - horizontal and vertical.

## Creative

Icons should clearly communicate their associated content. They also reflect the tone and style of Puppet's brand.

- Always use a common visual metaphor when one is available.
- Use strokes and outlines, not filled shapes - this communicates approachability and reduces visual density.
- Err towards clarity rather than accuracy - sacrifice detail or precision when its in the way of legibility.
- Avoid being clever unless it clearly increases legibility or delight in a meaningful way (subjective but important).
- Use a flat, 2-dimensional perspective. Exceptions can be made if 2d breaks the visual metaphor
- Do not use text unless absolutely necessary. If required draw them by hand. eg. currency symbols, text formatting, kpi charts.
- All icons are one color.
- Avoid complex nesting of shapes and intersecting lines.
- When objects overlap, provide a gap between objects - at least 2px.

### Silhouettes

A distinct silhouette helps the user quickly identify and understand iconography as they scan across a page. Because of the technical nature of Puppet's products, most icons will not have a clear meaning by themselves. Instead the icon primarily provides a distinguishing characteristic to help the user navigate between similar topics or actions.

This is exceptionally important in navigation, where a user relies more on a passing familiarity and position on screen to return to a specific screen.

![Example of icons with distinct silhouettes and confusing silhouettes](./icon-silhouette.svg)

## Using icons in isolation

The vast majority of icons do not provide enough information by themselves for a user to understand their purpose. It is very important that when using icons that we provide enough context for the user. **That does not mean icons always need text next to them**. It means we need to be considerate when providing context in other ways to aid user understanding.

![Example showcasing how a bell icon may be easily recognizable without text, while a box may not.](./icon-notext.svg)

![Ellipsis and kebab icons are ok to use without text](./icon-kebabs.svg)


**Consider**

- Is this an icon with broad use - eg. House for homepage, gears for settings, kebabs for menus...
- Space is at a premium - in a toolbar, actions within a table row
- Its used repetitively - a series of arrows in an accordion menu, the same actions repeat in every table row
- The user has intentionally isolated the icons - eg. collapsing navigation to just icons to conserve space
- Are aria labels and tooltips in place to provide an explanation in an accessible manner?

## Naming conventions

The same name should be used between the Figma library and the component library. Names should be prioritized in descending order:

1. **Object noun** - eg. Diamond, not Quality. Pencil, not Edit.
2. **Verb**. Describe the action, if the noun would be less clear. - eg. Undo, not Curved-Arrow-Left.
3. **Metaphor**. When the icon is otherwise obscure. eg. Continuous-delivery, Automation, etc.

### Group icon variations

Examples:

1. caret-down, caret-left, caret-right, caret-up
2. chart-area, chart-bar, chart-column, etc.

### Exported names

Exported SVGs should include a prefix for distinguishing size.

`i-[size in px]-name.svg`

**Example**: i-16-pencil.svg

## Implementation checklist

All icons must meet the following criteria prior to inclusion to the Puppet Design System.

### Symbol

- Added as a symbol to the library
- Symbol canvas matches pixel dimensions (16x16, 24x24, etc)
- Stroke are converted to shapes
- All shapes are combined and flattened
- Layer style of `Icon/Base (N600)` is applied
- Symbol has an export preset of SVG applied, with a prefix of `i-[size]-`
- Layers are not pinned to the edge or set to a fixed size
- No inline styles are applied to any layer
- The symbol name must follow naming criteria, and organized into the symbol folders (eg. Icons/[size]/Name or Icons/16px/Pencil)

### Creative

- It does not overlap with existing icons - eg. we don't have both a Pencil and an Edit icon.
- The metaphor is clear and follows our criteria
- The pixel grid is maintained and all design rules are followed
- Naming conventions are followed
- Any exceptions to the rules are reviewed and accepted

### Technical

Test that the icon:

- Scales correctly
- Accepts style changes
- Name corresponds with Figma library and exported SVG
- Is added to documentation

## Related

- [Icon component](#/React%20Components/Icon): a list of available icons and guidelines for using them
