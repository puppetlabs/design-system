# 5.0.0-alpha.1
- * **breaking change**: Completely remove `Panel` component
- Adds `elevation` prop controlling box-shadow elevation
- **breaking change** Removes `style` prop, so that `style` can be used to pass the card inline-styles
- Adds `secondary` card (controlled by new `type` prop)
- Adds `as` prop for dynamic element rendering
- **breaking change** Adds `selectable` prop. Previously, a card was considered selectable if it was passed an `onClick` handler. This separates the handler from the boolean rendering logic.
- **breaking change** removes `width` and `height` props. Users can now specify explicit widths and heights via inline styles: `<Card style={{ width: 40, height: 60 }} />`
- Pass through all extra props to the inner element
- Substantially update Card documentation in styleguidist

# 4.16.0

- Add ability for consumers of `Table` to specify how row key props are generated
- Fix child component type checking in Form

# 4.15.0

- Fix regression to filter form submit button and selects
- Adding two tone icons
- Fix Loaders in the styleguide
- Small updates to toggle component
- Always uppercase badge text

# 4.14.1

- Form now accepts disabled prop, that disables all fields and buttons
- Adding an applyLabel prop to the dropdown menu for i18n support

# 4.14.0

- Forms now accept children other than FormField and FormSection
- Updated styleguidist docs for Accordion and List to accurately reflect use of subcomponents
- Add deprecation HOC
- Add deprecated propType helper
- Change internal className for Loading component

# 4.13.0

- Update `Button` styles to accommodate multi-line text
- Add "nowrap" prop to `Button` for previous behavior
- Add "flat" `Card` type for styles without shadow
- Add Sass variables for vertical and horizontal `Grid` gutter
- Adjust `Form` padding for better spacing of fieldset sections
- Standardizing how we export cards and fixing the styleguide

# 4.12.1

- Add `className` prop to `Grid.Row`
- Add styleguide HTML

# 4.12.0

- Updating panels so that they are clickable

# 4.11.0

- Allow MenuItem consumer to provide href
- Add purple palette
- Add 'allowUnchangedSubmit' option to Form component
- Add stoplight colors to Text component

# 4.10.1

- Export Breadcrumb component

# 4.10.0

- Update to default line height
- Adding the ability to supply a label for the button in blank slates

# 4.9.0

- Moves requiredFields from top level on `Form` to individual `FormFields`
- Form now accepts `block` as an option for `actionsPosition`
- Form component now automatically disables submit button until the user has changed at least one form field
- Fixed bug allowing number ids to be passed in as `selected` prop in dropdown

# 4.8.2

- Fixing regression in select component
- Commiting design file as a test
- Including webpack bundle analyzer

# 4.8.1

- Trivial: replace sidebar bottom margin with bottom padding for firefox bug fix

# 4.8.0

- Form component now accepts "requiredFields" prop for automatic validation
- ConfirmationModal and Modal can take a background prop
- Invalid inputs for Select will reveal "No results found"
- Invalid inputs for Select (excluding multi-Selects) will be reset when exited

# 4.7.2

- Fixed regressions introduced by new button shadows and previous accordion updates.
- New props for badge component - palette and level.
- New profile and impact icons.
- Support various input types in the Form.Field component

# 4.7.1

- Updates to the design
- New type prop for panels

# 4.7.0

- Add Link component

# 4.6.0

- Add badge component

# 4.5.0

- New icons: rocket, diamond, target, build, deploy
- Allow GridColumn to take a className
- Remove obsolete Grid collapse style

# 4.4.0

- Updates to sidebar to include logo and dark theme

# 4.3.0

- Added a new alert component
- Cleaning up the sidebar animations and UX
- Various small design updates

# 4.2.0

- Update modal styles, in particular confirmation modal styles
- Internationalize modal strings
- Improve accessibility of buttons
- Fix oneOfType warnings
- Support both left and right actions placements for forms/modals

# 4.1.4

- Updates to dropdown styling
- Cleaning up the CSS

# 4.1.3

- Prevent default form submission
- Add support for synchronizing width of dropdown menu and target
- Tighten active states and reduce code following major sidebar revisions

# 4.1.2

- More visual updates to match the design system

# 4.1.1

- Improve the sidebar, fewer levels of nesting, crisper design
- Better hover states for pagenav

# 4.1.0

- Add Text component encapsulating body Typography
- Update pagenav styling implementation
- Remove some global typography scss
- Fix font name spelling mistake

# 4.0.0

- New heading component
- Updated color palette
- New font stack include Calibre and Open Sans
- Updated CSS to better match the design system

# 3.3.0

- Adding props to the filter component to allow custom operators and to improve i18n capabilities
- Update linting dependencies and adding prettier

# 3.2.1

- Remove stray module.exports for babel 7 compatibility

# 3.2.0

- Form component now accepts cancelLabel prop for internationalization
- Bug fix: stop event propagation from menu item click
- Form component now keeps track of client validation errors in addition to those passed in

# 3.1.4

- Fix to borders on Menus

# 3.1.3

- Visual and functional updates to sidebar component
- Floating action buttons can have icons other than the plus

# 3.1.2

- Add secondary and bold props to Tag and revise default styles
- Add mouseenter and mouseleave props to Card
- Add clipboard icon

# 3.1.1

- More styling options for Grid component
- Content component can now take a className prop
- Update tiny Tag size

# 3.1.0

- Adding a Grid component
- Adding a Pagenav component
- Adding to the list of code owners
- Cleaning up Panels

# 3.0.3

- Position accordion header action icon with flex rather than absolute positioning

# 3.0.2

- Upgrade babel, use babel-preset-env for latest transpiling
- Add browserslist
- Use babel-preset-env for automatic polyfills
- Update look and feel of the header and sidebar component

# 3.0.1

- Improve Header and Sidebar styles for responsive layouts

# 3.0.0

- Upgraded to React 16

# 2.1.1

- Internal updates to support internationalization

# 2.1.0

- Adding sizes to icons
- Updating the look and feel of modals
- Add Breadcrumbs component
- Add Sidebar component
- Add Header component

# 2.0.0

- Rename library to @puppet/react-components
- Replace scss variable prefix with $puppet-

# 1.3.3

- First pass using Puppet styling
- Add CONTRIBUTING.md

# 1.3.2

- Remove the default minification in webpack 4 for this module
- Fix react warnings found in styleguide

# 1.3.1

- Publishing to artifactory via Continous Deployment

# 1.3.0

- Renamed to @puppet/insights-ui-components and deployed to artifactory
- Upgraded to webpack 4
- Preparing for react 16 upgrade by pulling in the prop types dependency

# 1.2.19

- Internal dependency upgrades

# 1.2.18

- Ensure Selects preserve multi-selected state when applicable
- Update Confirmation Modal to accept a title
- Allow Checkboxes to set state with received props

# 1.2.17

- Bug fix for showing hover-state list item action buttons

# 1.2.16

- Updates to the `BlankSlate` component to be more versatile

# 1.2.15

- Performance improvements for popovers
- Bug fix for how we handle popovers
- Select-item/Tag refactoring to unify app styles

# 1.2.14

- Properly hide dropdown icon when button is processing

# 1.2.13

- Default background color on accordions

# 1.2.12

- Disable autocomplete for Select inputs

# 1.2.11

- Add new Icon for reflect-app

# 1.2.10

- Bug fix in how we handle on change validation

# 1.2.9

- Improvements to form validation

# 1.2.8

- Bug fix for how we handle selected items in dropdowns

# 1.2.7

- Small updates to tag and slidein designs

# 1.2.6

- Fix an issue causing Dropdown selected states to not be applied

# 1.2.5

- Update the select component that allows us to pass a selected string or array

# 1.2.2

- Design tweeks to the accordion and menu headers

# 1.2.1

- Fix an issue in IE causing Checkboxes to not have borders

# 1.2.0

- Animations for Popovers and other elements
- Updating Popover positioning
- Significant cleanup and improvements to spacing in Forms

# 1.1.0

- Support for actions in menus
- Icon cleanup
- Scroll with keyboard shortcuts in Select
- Select styling
- List styling
- Allow us to specify borders on popover children instead of the popover itself

# 1.0.1

- Export `FiltersForm` standalone
- New icons for Studio
- Updating sizing for various components
- Keyboard shortcuts for Selects
- Remove old `Filter` component

# 1.0.0

- Introduce a Checkbox component
- Introduce a Slider component
- Introduce a Filters component
- Introduce a Form component
- Updates to ListItems
- Add multiselect capabilities to Select
- Add typeahead to Select
- Add clearable option to Select
- Update Button font and styling
- Update component type icons
- Begin on updating size naming conventions to be consistent with design system

# 0.4.1

- Fix a bug preventing inputs from functioning in some cases.

# 0.4.0

- Adding actions to dropdowns and dropdown menus

# 0.3.8

- Cleaning up the button component and updating the design of the split button to match our new design system

# 0.3.7

- Fix a CSS issue causing Accordions to not be full height in IE

# 0.3.6

- Fix a bug where pointer-events weren't being applied to tooltips

# 0.3.5

- Input can now be put in multiline mode

# 0.3.4

- Fix a bug causing hidden tooltips to sometimes break other elements

# 0.3.3

- Improved tooltips include the ability to close sticky ones

# 0.3.2

- Better browser support for Select component

# 0.3.1

- Bug fixes around positioning tooltips
- Bug fixes for Select component

# 0.3.0

- Introduce a Select component, replacing react-select
- Add Clone and Info icons

# 0.2.0

- Various updates to our Accordion component

# 0.1.4

- Add resets to anchor tags
- Provide numbers with units for proper icon sizing

# 0.1.3

- Fix an issue causing Icons to be mispositioned within Buttons

# 0.1.2

- Support for specifying margins and anchor in Dropdown component

# 0.1.1

- Support for dynamic heights in StencilGrid
- New icons
- Simple input with icon

# 0.1.0

- Adding a new prop to button that causes it to act like a dropdown
- Fixing bug in icon sizing

# 0.0.77

- Remove the reset of svg heights/widths to initial and instead explicitly set on each svg

# 0.0.65

- Bar stencils should be the same as bars

# 0.0.28

- DatePicker learns how to respect timezones

# 0.0.27

- Add Tooltip component.
- Add a code icon.

# 0.0.26

- Add SplitButton component.

# 0.0.25

- Implement `componentWillReceiveProps` for Dropdown component.

# 0.0.24

- Add filter icon
- Make Tab panels clickable
