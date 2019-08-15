## Overview

<small class="rsg--pathline-29">Sketch symbol: puppet-ui-library / Button</small>

Puppet products use a family of buttons, with each button intended for a different purpose. Buttons are different from links. They carry out a specified action when clicked, such as submitting a form, adding content to a list, or initiating edit functionality. Avoid using them to provide navigation.

### Microcopy

* When providing a label for a button, use an imperative verb and a noun, for example: Add group. The verb-plus-noun construction increases usability and eliminates ambiguity for localization.
* Rarely, just the imperative verb is ok (Apply, Add, Remove) if the context is crystal clear.
* Use sentence-case capitalization: Capitalize the first word, and lowercase all other words except proper nouns.

### States and interaction

Buttons provide built in support for hover, active, and focused interactions. All buttons also provide loading and disabled states as needed.

## Types

### Primary

Use a primary action button for the single most important action on the page — the action which initiates a workflow (e.g. Add node, Create report, etc.), moves the user forward in a workflow (e.g. next, submit, continue, run, etc.), or resolves a workflow (e.g. delete, apply, commit, etc.).

A primary action button should be used sparingly: no more than 1 primary action per page or instance (e.g. within a modal).

[insert example, include a variation with an icon]


### Secondary

Use this button for actions that are important, but hierarchically less important than the primary action. Use it for the predominant action on the page when there is no primary action.

[insert example, include a variation with an icon]

### Tertiary

This button type is for less important actions that a user might take on a page, for example, for micro-workflows such as applying a filter or confirming a change.

[insert example, include a variation with an icon]

### Transparent

Use this button when the design is dense or getting cluttered, or for low-level actions when the hierarchy is deep. For example, transparent buttons are effective in toolbars, or for actions inside a table cell.

[insert example, include a variation with an icon]

### Danger

Use a red button to indicate a dangerous or destructive action. Always provide descriptive text, and get wording advice from a writer. For actions with less severe implications, or when many destructive actions are visible, use the subtle style.

[insert example, bold and subtle together, include a variation with an icon]

### Text button

The lowest level button in the visual hierarchy. Similar in appearance to links, these are used to reduce visual weight or noise and are reserved for extremely compact use cases.

Example uses include adding content to a text list, providing actions within a menu, or providing card controls. Note that you should use these for actions, not navigations. See the [Link component](#/React%20Components/Link) for more information.

[insert example, include a variation with an icon - do not show the select, as that should be with ButtonSelect]

## Variations

### Icon

Use icons to assist in understanding the purpose of a button, or to help distinguish the button from similar actions that lie in close proximity. By default, include words to describe the button as this is much more accessible. Icons are available for use in every button type.

Use an icon by itself when you’re working with smaller spaces and are sure that the meaning of clicking a button is clear enough by its picture. A few icons are common across many applications and are acceptable for use. Solo icon buttons must provide a tooltip with [TooltipHoverArea](#/React%20Components/TooltipHoverArea).

*Note*: Indicating states (danger, success, warning) with icon colors is reserved for specific use cases within alerts and messages. Do not use color on icon buttons arbitrarily.

#### Example: Primary buttons with only icons

[insert examples of different states]

#### Example: Acceptable icons - with and without text

[insert examples using tertiary buttons, both with and without words. Place solo examples within a TooltipHoverArea.

Edit, Add, Settings, Profile, More, Trash, Close, Remove, Show, Hide, Expand, Collapse, Full screen, Help, Information, Link, Attach, Notification, Export, and Chart]

## Related
*  [ButtonSelect](#/React%20Components/ButtonSelect) 
*  [ActionSelect](#/React%20Components/ActionSelect) 
*  [Icon](#/React%20Components/Icon) 
*  [Loading](#/React%20Components/Loading) 
*  [Form](#/React%20Components/Form) 
*  [TooltipHoverArea](#/React%20Components/TooltipHoverArea)
