## Overview
Our products use three typefaces, with their various weights and sizes, to communicate clearly to our users. Don’t introduce new typographic styles to our products without consulting the UX team.

## Typefaces

### Calibre
Calibre is our brand typeface and is used in our logo, branding and other marketing materials. We use it in our products to separate content and interactive elements from other content. Examples include headlines, titles, navigation, visualizations, and other primary elements

### Open Sans
We use Open Sans for the majority of content. Calibre is great in larger sizes but becomes problematic at the smaller sizes our products need, becoming difficult to read within a dense interface.

### Inconsolata
Inconsolate is our fixed-width typeface for used to represent code and code examples.

## Sizes
All font sizes and their associated line-heights are based on our 4px grid.

```
  <Heading as="h1" hero>Hero</Heading>
  <text size="small">Large number is chart gauges</text>
  <text size="small">Calibre, semi-bold 600, 48px/56px</text>

  <Heading as="h1">Heading 1</Heading>
  <text size="small">Page titles</text>
  <text size="small">Calibre, semi-bold 600, 40px/48px</text>

  <Heading as="h2">Heading 2</Heading>
  <text size="small">Detail page titles, page-section titles</text>
  <text size="small">Calibre, semi-bold 600, 32px/40px</text>

  <Heading as="h3">Heading 3</Heading>
  <text size="small">Mid-level headings, card titles, modal titles</text>
  <text size="small">Calibre, semi-bold 600, 24px/32px</text>

  <Heading as="h4">Heading 4</Heading>
  <text size="small">Content section titles, card section titles</text>
  <text size="small">Calibre semi-bold, 600, 18px/24px</text>

  <Heading as="h5">Heading 5</Heading>
  <text size="small">Low-level section titles, table titles</text>
  <text size="small">Open Sans, bold 700, 14px/20px</text>

  <Heading as="h6">Heading 6</Heading>
  <text size="small">Detail page titles, page-section titles</text>
  <text size="small">Open Sans, bold 700, 12px/16px</text>

  <Heading label>Label</Heading>
  <text size="small">Sidebar headings and other small format headings. Small form labels, badges, visualization callouts, legends</text>
  <text size="small">Calibre, semi-bold 6600, 11px/16px</text>

  <text>Body</text>
  <text size="small">Default page content</text>
  <text size="small">Open sans, regular 400, 12px/16px</text>

  <text>Small</text>
  <text size="small">Card content and many UI elements</text>
  <text size="small">Open sans, regular 400, 12px/16px</text>

  <text>Tiny</text>
  <text size="small">Breadcrumbs, captions, and form field descriptions</text>
  <text size="small">Open sans, semi-bold 600, 11px/20px</text>
```

## Related
* [Content](#/React%20Components/Content) : used to place formatted text within other components. Provides examples and rules for adding content to a page
* [Heading](#/React%20Components/Heading) : place a heading anywhere
* [Text](#/React%20Components/Text) : place individual text strings
* [Link](#/React%20Components/Link) : place text links within other elements
* [Content writing](#/React%20Components/Content) : a component for placing content blocks within an interface
