# Text
```jsx
import { Text } from '@puppet/react-components';
```
[Insert Props & Methods expanding section]

## Overview
###### Sketch symbol: puppet-ui-library / Text

The text component is a foundational element that provides an encapsulated way to use typography, consistent with design system rules. Together the `size` and `color` props determine the rendered typographical variant.

Our products use three font families, with their various weights and sizes, to communicate clearly with our users. Don’t introduce new typographic styles to our products without consulting the UX team.

Design specifications can be found in the [Styleguide](packages/design-assets/puppet-styleguide.sketch).

## Type
### Font Families
* <strong>Calibre</strong>: Headlines, titles, navigation, visualizations, and other primary elements
* <strong>Open Sans</strong>: Body copy and general UI elements and content
* <strong>Inconsolata</strong>: Code samples
<details>
<summary>font family examples</summary>
<p>
[Insert "Type style" table found http://designsystem.puppetlabs.net/typography]
</p>
</details> 

### Text Colors
Take into account expected behavior and accessibility guidelines when using text colors. 

#### Neutral Colors
These colors are used for the majority of text. They are defined as Base (default), Medium, and Subtle.

```jsx
<Text><strong>Base</strong> (Neutral 900): This is the darkest and the most commonly used.</Text>
<Text color="medium"><strong>Medium</strong> (Neutral 700): This is used to reduce emphasis on text.</Text>
<Text color="subtle"><strong>Subtle</strong> (Neutral 600): This further reduces emphasis and is reserved for asides and supplemental information. Use for heading styles Heading 5 and larger.</Text>
```

#### Stoplight Colors
Our "stoplight" colors are reserved to apply meaning, or state, within a given context. Use these for the text component (Body, Small, Tiny). They are defined as Success, Danger, and Warning.

```jsx
<Text color="success"><strong>Success</strong>(Green 700): Used to communicate a successful operation or general approval.</Text>
<Text color="danger"><strong>Danger</strong>(Yellow 600): This communicates a dangerous, irrecoverable action or failure of some kind.</Text>
<Text color="warning"><strong>Warning</strong>(Red 600): This is used to call attention to specific information or to provide a warning. Can also be used to convey an unknown state IF that could be problematic for the user.</Text>
```

# Related
*  [Header](http://designsystem.puppetlabs.net/components/#header) 
*  [Link](http://designsystem.puppetlabs.net/components/#link) 
*  [Color](http://designsystem.puppetlabs.net/components/#colors) 


