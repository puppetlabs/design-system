## Design contributions
For the design system to evolve and meet our users’ needs, continuous and collective contribution is key. A contribution can range in size from small to large and can come in the form of a fix, an enhancement or the addition of a brand new feature.

### 1.  Identifying a user need
The starting point for a design contribution will usually be that you have a user need for a component in your product that’s not fulfilled by what’s currently in the design system or see a current component that you’d like to adapt, improve or fix. Contributions will range in size and scale so if in doubt, start small. 

### 2.  Should it be added to the design system?
The component should fill a unique role that would be difficult to meet using existing components. Think about whether it could be of value to other products, and therefore upstreamed to the design system, or specific to your product in which case kept as a standalone component. If in doubt, ask for team input on *[#team-ux](https://puppet.slack.com/archives/GF43477DH)* or *[#team-design-system](https://puppet.slack.com/archives/CFFECRQAY)* Slack channels.

### 3.  Collaborate
Once you’ve identified a need for a design system contribution you should work closely with your engineering team throughout the process to collaborate and iterate on ideas. Engaging with the design system team and UX team can also be invaluable, especially on more complex components and patterns.

### 4.  Design

#### Tooling
Our designed components are housed in the [PDS UI Components Figma file](https://www.figma.com/file/9RzmjE0XYWWADWLKOJP5mR/PDS-UI-Components). Contained within this file is step by step guidance on how to create and publish a component in Figma.

#### Design criteria
The published Figma component will be used by both engineering and UX designers so consider the following:
* *UI states*: (eg. active, hover, pressed, disabled, focused, loading)
* *Interaction*: (eg. clicking reveals a menu, typing begins an auto-complete)
* *Scale and Size*: consider how another designer might resize, or how it would change size in the browser or based on content. Define widths (min, max, default set/autosizing). Lock positions when needed. Use frames instead of groups.
* *Re-use*: how flexible is it to use within other patterns or next to other components
* *Customization limits*: In general we try to reduce customization options to just those available within code. Ensure appropriate overrides are available or off
* *Naming*: Coded components will use the same name as defined in Figma. Is its name unique and identifiable? 
* *Layer & text styles*: Avoid direct styling of text and shapes.
* *Accessibility*: Must meet WCAG 2.1 Level AA guidelines
* *Testing:* Does the component behave as expected? Are the breaking changes to other components?

#### Design review
Collaboration is an important part of the design process so before publishing the component in Figma request a review from design and engineering.

#### Publishing
As there’s the potential to break existing designs, publishing changes in the Figma library can appear daunting but following this process will mitigate the risk and issues that arise from publishing can always be rolled back.

### 5. Documentation
The design system website allows designers and engineers to quickly reference coded components so providing documentation is very important. At a minimum, this should include a written overview of the component and written examples of any types and variations. Icons don’t normally need to be documented.

### 6. Handoff
It’s the responsibility of the designer to ensure the following criteria is met for a smooth handoff to engineering.
A successful design meets the following criteria:
1. It is supported by a user need.
2. The component is either an improvement or fix or fills a unique role that would be difficult to meet using existing components.
3. The design meets all necessary design criteria, has been reviewed and published in Figma.
4. Documentation meets the minimum requirements.

## Best practice for building components
The PDS UI Components Library in Figma should reflect what exists in the React components library but there will be a period during development when an uncoded component is available in Figma. Adding a ‘not yet in PDS’ label to the description will make this clear to designers.  

### Layers
* *Organization*: Layers are organized visually, left to right and top to bottom.
* *Naming*: Rename layers to match the needs of component overrides. eg. Text layers in a form input are individually named “Label”, “Input text”, and “Placeholder”. A name of “Background” is useful, where as “Rectangle” is not.
* *Hints*: Layer names may include hints to guide the user, such as ‘initial state’ or ‘do not resize’
* *Frames (not groups)*: Use ‘Frames’ instead of ‘Groups’ to collect layers together for easier selection and manipulation.

### Component names
* Follow existing naming conventions where possible.
* The name determines where it sits in the component menu’s order.

### UI states & variations
Variations to state or layout, such as hover or focus, should be created as separate components. This allows them to be easily swapped out.
* Variations should be instances of the base component with overrides applied.
* All variations should be the same dimensions.
* Variants are a powerful addition to Figma that enable us to quickly switch between states in design files. Consider using these where possible.

### Spacing
All components should be aligned to our base 4px grid.

##### Examples:
* 16px icons
* 4px between related buttons or interactive elements
* 8px between icons and content
* 16px between discrete elements in a row or column (eg. legend items in a chart)
* 16px gutter between content containers or cards

### Acceptance checklist:
* Has it been made a component?
* Are all UI states made into components?
* Are all UI states or other variations the same size?
* Is it accessible?
* Is it i18n compatible?
* Are the layers named correctly?
* Are all layers using layer & text styles?
* Does it visually match patterns established in other components?
* Is it using nested components?
* Does this change impact other components or patterns already in use (eg updating a base button impacts other buttons)?
* Are any of the changes breaking to others?
* Does it require a new plugin?
* Are all shapes on the pixel grid (no sub-pixels)?
* Does it resize correctly?

### Making updates
When updating components and styles, be aware that removing layers will adversely affect downstream users. For instance if you need to change an existing text layer, do not delete it or replace it with a new layer. This breaks the connection to instances of that component in other files. Instead manipulate and adjust the existing layer to meet your needs. The same holds true for nested components, vector shapes, etc.

* Do not delete existing layers
* Use the replace function to swap out nested components
* Update layer names to reflect changes
* Update layer & text style definitions
* Document any breaking changes in your changelog - provide steps for remediation
