The text component provides an encapsulated way to use typography consistent with design system rules. Together the `size` and `color` props determine the rendered typographical variant.

Design specification: <a href="http://designsystem.puppetlabs.net/typography" target="_top">designsystem.puppetlabs.net/typography</a>

```jsx
<Text>Default text size</Text>
<Text size="small">Small</Text>
<Text size="tiny">Tiny</Text>
```

#### Color

A variety of color options are available.

##### Neutrals

These colors are used for the majority of text.

```jsx
<Text>This is using the default color. It is the darkest and the most commonly used.</Text>
<Text color="medium">This text is in a medium gray color. It is used to reduce emphasis on text.</Text>
<Text color="subtle">This text uses the subtle color. It further reduce emphasis and is typically reserved for asides and supplemental information.</Text>
```

##### Stoplight colors

Our "stoplight" colors are reserved to apply meaning, or state, within a given context.

```jsx
<Text color="success"><strong>Success</strong>: Used to communicate a successful operation or general approval.</Text>
<Text color="danger"><strong>Danger</strong>: This communicates a dangerous, irrecoverable action or failure of some kind.</Text>
<Text color="warning"><strong>Warning</strong>: This is used to call attention to specific information or to provide a warning. Can also be used to convey an unknown state IF that could be problematic for the user.</Text>
```
