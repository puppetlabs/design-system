# 5.4.2
- Add autocomplete type for Select

# 5.4.1
- Fix shrug and lock icons

# 5.4.0
- Add project nebula logo
- Add invite, shrug, and lock icons
- Update some component documentation

# 5.3.0
- Add corejs as top-level dependency
- Add contract and spaceship icons

# 5.2.0
- Add Card.Action component for a single action
- Don't disable cancel button when entire form is disabled
- Small styling bug fix in dropdown

# 5.1.0
- Add ConfirmationModal component

# 5.0.2
- Truncate text in sidebar footer details

# 5.0.1
- Support navigation links in sidebar footer

# 5.0.0
- Release stable branch

# 5.0.0-alpha.30

- **Breaking change** Remove tag component
- Update typography and styling for Text, Tab, Sidebar, Badge, Alert and Card components
- Remove extraneous font imports

# 5.0.0-alpha.29

- Add type prop to Tab so an individual tab can have `type="secondary"` for a gray tab and panel background
- Remove border-right from Sidebar

# 5.0.0-alpha.28

- Bug Fix: Allow submission of forms with manually provided field-level errors

# 5.0.0-alpha.27

- Upgrade Styleguidist to v9
- Update Card selected hover state to be the same as card selected state
- Stop propagation for ActionSelect and ActionMenuList buttons
- Add SubmitType prop to Form

# 5.0.0-alpha.26

- Fix conflicting aria-disabled attribute in Button
- Add accessible Modal
- **Breaking change** Modal actions are now left-aligned
- **Breaking change** Remove ConfirmationModal
- **Breaking change** Remove `title` prop from Modal in favor of Modal.Title subcomponent
- **Breaking change** Remove `actions` prop from Modal in favor of Modal.Actions subcomponent
- **Breaking change** Remove `size` prop from Modal. Default is now 480px, users can override by passing a custom className
- **Breaking change** Remove `unbindShortcut`, `bindShortcut`, `margin`, `height`, `size`, `sidebar`, `sidebarPosition`, `actionsCTA`, `modalClassName`, `actionsPosition`, and `title` props from Modal
- List core-js as direct dependency (needed by way of @babel/polyfill)
- Use webpack-node-externals to reduce bundle size
- ActionMenu can accept a number as an action id
- Update Card styling to include focus state
- Update Card documentation
- **Breaking change** Remove Card.Header subcomponent
- **Breaking change** Remove Card.Section subcomponent
- Add Card.Title subcomponent
- **Breaking Change** Rename Card.ActionsMenu -> Card.ActionSelect
- Remove Filters and related components from react-components documentation, add note about deficiencies
- **Breaking Change** Remove ButtonGroup component
- **Breaking Change** Rename ActionMenu -> ActionSelect
- **Breaking Change** Remove many scss variables from palettes and common
- **Breaking Change** $puppet-common-spacing-base is now 4px, updated for clarity of intent
- Stop propagation of key events from active select menus
- Upgrade dependencies
- Fix all console errors in styleguidist
- Remove unnecessary styleguidist wrapper components
- Add margins and max height to modal component

# 5.0.0-alpha.25

- Introduce breadcrumb component
- **Breaking change** Remove TooltipStickyArea component
- **Breaking change** Remove sticky and onClose options from tooltip
- Tooltip no longer uses react-portal

# 5.0.0-alpha.24

- Add "integration" icon
- **Breaking change** Temporarily remove Accordion component
- **Breaking change** Rename Heading's boolean `smallTitle` prop to `label`

# 5.0.0-alpha.23

- Bug fix: use overflow: auto in menus
- Bug fix: correctly diff active id in tabs

# 5.0.0-alpha.22

- **Breaking change** Remove isActive, growl & dismissAfter props and all growl functionality from Alert
- **Breaking change** Use Alert children, not message prop, for inner content
- **Breaking change** Replace 'error' with 'danger' as one accepted value for type prop for Alert
- Add elevated prop to Alert
- Add IconButton as an auxiliary component for Alert
- Abstract color schemes for success, danger, warning & info states
- **Breaking change** Remove Dropdown component
- **Breaking change** Remove Popover component
- **Breaking change** Remove Menu component
- Implement new ButtonSelect component
- Implement new ActionMenu component
- **Breaking change** Remove autoOpen, clearable, disablePortal, newOption, onNewOption, newOptionLabel, noResultsLabel, popoverClassName, valueless, and typeahead props from `Select`
- Add actionLabel prop to select
- Tab targets can now be rendered as custom elements in order to enable routable tabs
- Button can now forward ref to a prop with an alternate name

# 5.0.0-alpha.21

- id is no longer a required prop of Tabs
- **Breaking change** Rename `activeTab` prop on `Tabs` to `initialTab`
- **Breaking change** Manual tab activation is now controlled at the Tabs.Tab component level with the `active` prop
- **Breaking change** "type" prop on Badge renamed "weight"
- **Breaking change** "pill" badge type is now a boolean
- **Breaking change** "color" prop on badge renamed "type"
- **Breaking change** Remove palette prop on Badge
- Add Remediate logo

# 5.0.0-alpha.20

- Update form icons, spacing and font colors to match design system
- Align disabled input opacity across components
- Style checkbox, switch, and FormField
- **Breaking change** Remove List component
- **Breaking change** Table column definition spec updated to match a subset of [React-Virtaluzed](https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md)'s column definition spec. This is to standardize this basic table API with the API currently used in Puppet Remediate. We will evolve this basic spec as needed going forward.
- **Breaking Change** Remove striped prop. Table is no longer stripey
- **Breaking Change** Remove `selectable` prop. The basic table is no longer selectable
- **Breaking Change** Remove onChange and onSelectChange. No longer needed as the table is not interactive.
- **Breaking Change** `getRowKey` method replaced with `rowKey` prop. By default it will look for rowData.id
- **Breaking Change** Remove `ColumnSelect` and `ColumnInput` public components
- Table style updates
- Greatly improved table documentation
- Style link focus state
- Introduce size prop to link element
- Re-implement tabs component

# 5.0.0-alpha.19

- **Breaking change** Remove tabs component
- **Breaking change** Remove grid component
- **Breaking change** Remove header component
- **Breaking change** Remove slider component
- **Breaking change** Remove breadcrumb component
- Improve Text component documentation
- Bug fix: Allow form children with no props
- Allow any node for Card.Header title

# 5.0.0-alpha.18

- Enable installing react-components as a [git URL dependency](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) to reference forks, branches, or commits, e.g. `npm install vine77/react-components#5.0-development`
- Add compatibility with React Router to the `Sidebar`
- Remove text underline for `<Button as="a">`
- Add React app for http://designsystem.puppetlabs.net

# 5.0.0-alpha.17

- Bug fix: Symmetrize shallowDiff helper so that shallowDiff({}, { key: 'value' }) returns true

# 5.0.0-alpha.16

- **Breaking Change** Remove SplitButton
- **Breaking Change** require that `clickable` prop be present in `Tag` for main body to be clickable
- Style update in Tag
- Introduce fallback custom logo option
- Upgrade webpack to avoid vulnerability
- Design fix: remove text decoration in sidebar links

# 5.0.0-alpha.15

- Button updates
  - **Breaking change** remove `size` prop
  - Add `weight` prop
  - **Breaking change** remove props: `secondary`, `transparent`, `floating`, `simple`, `badge`, `block`, `round`, `square`, `dropdown`, `error`, and `message`
  - Introduce string `type` prop for main visual variant switching
  - **Breaking change** replace `processing` prop with `loading` to maintain consistency with design docs
  - **Breaking change**: prexisting `type` prop has been renamed `buttonType`
  - **Breaking change**: Remove `label` prop, text is now only passed in as children
  - Update Button documentation
  - \*\*Breaking change
  - Adapt to Button API changes in consuming components
  - Update Loading component to set size with css
  - **Breaking change** Remove support for small form fields

# 5.0.0-alpha.14

- Exporting the new Logo component

# 5.0.0-alpha.13

- Updates to Sidebar
  - **breaking change** Change the API for the `Sidebar` to make it more composable. This now includes `Sidebar.Header`, `Sidebar.Navigation`, `Sidebar.Footer`, `Sidebar.Section`, and `Sidebar.Item`.
  - **breaking change** Remove nested navigation items
  - **breaking change** Remove `toggleable` from the list of props. The expectation now is that the minimized sidebar would be applied via a user setting
  - Refactor to make accessible
- Overflow fix for the Alert component

# 5.0.0-alpha.12

- Update icon set and icon scaling
- Add loading state to select
- Fix input container width

# 5.0.0-alpha.11

- Bug fix: create index file for public scss variables

# 5.0.0-alpha.10

- Add badges to styleguide indicating component approval state
- Design bug fix: Place form-level error alert between fields and action instead of below all
- Add optional "custom action" to Select w/ onNewOption and newOptionLabel props.
- Upgrade react dependency to 16.8
- **Breaking Change** Remove DatePicker component and subdependencies (moved to insights-ui)
- Refactor scss: create components subdirectory and 'public' directory containing stable scss variables and mixins
- Bug fix in FormField: make isEmpty check generalizable to non-strings
- Bug fix: Update multiselect docs to use type="multiselect"
- Create new "Logo" component encapsulating logo design patterns
- Style Input component to spec

# 5.0.0-alpha.9

- Fix bug that prevented validating checkbox form fields in forms

# 5.0.0-alpha.8

- Update Form.Field component:
  - **breaking change** `size` prop is now restricted to `medium` and `small`
  - **breaking change** remove `tooltip` prop option
  - **breaking change** remove `elementProps` prop, replace by spreading all additional props to inner input element.
  - Create standardized FormField interface
  - Clean up internal code substantially based on standardized input interface
  - Create extensive documentation for the use and intent of `Form.Field`
- Update Input component:
  - **breaking change** Restrict to `medium` and `small` sizes
  - Remove unnecessary internal event handling
  - Pass `className` and inline `style` to top level wrapper div
  - Spread all props down to internal input
  - **breaking change**: Remove `.focus()` and `.blur` methods in favor of an `inputRef` prop that allows users direct access to the inner dom element.
  - **breaking change** Remove `multiline` boolean prop in favor of `<Input type="multiline" />`. This clarifies the API and will make the component easier to use via `Form.Field`.
  - Fix visual bugs in icon inputs
  - **breaking change** replace boolean `icon` prop with string `icon` prop so that an arbitrary icon can be used inside the input field.
  - Add `trailingIcon` prop, for a trailing icon
  - **Breaking change** onChange handler now reports back the new input value, parsed based on input type, rather than the original event. This change is to standardize the Form.Field interface.
  - **breaking change** deprecate boolean `autoComplete` prop in favor of the ability to pass `autoComplete = 'off'` to the inner element via spread-props.
  - Clean up internal implementation significantly.
  - Update input documentation
- Update checkbox component:
  - Remove unnecessary internal state management
  - Spread all props to internal element
  - Introduce label element to input, styled appropriately and positioned to the right of the element
  - Accessibility fix: Use native disabled and required tags on inner input element.
  - Update checkbox documentation
  - **breaking change** name and label are now required props
  - **breaking change** checkbox now takes its value from `value` prop rather than `checked` prop. This is to align with FormField interface
- Update Switch component:
  - Spread all props to internal element
  - Accessibility fix: Don't use `label` element for internal rendering
  - Update documentation
  - Remove unnecessary internal state management
  - Spread all props to internal element
  - Introduce label element to input, styled appropriately and positioned to the right of the element
  - Accessibility fix: Use native disabled and required tags on inner input element.
  - Update checkbox documentation
  - **breaking change** name and label are now required props
  - **breaking change** checkbox now takes its value from `value` prop rather than `checked` prop. This is to align with FormField interface
  - **breaking change** `onChange` callback now reports new value, rather than original event. This is to align with the FormField interface.
- Update `Select` component:
  - **breaking change** `name` prop is now required
  - **breaking change** replace `onSelect` prop with `onChange` prop. This is to standardize FormField interface, the methods function identically.
  - **breaking change** replace `selected` prop with `value` prop. This is to standardize FormField interface.
  - **breaking change** Select now only accepts `medium` and `small` as size options.
  - ** breaking change** Remove new option functionality including unused `onPendingDeleteChange`, `onNewOption`, and `newOptionLabel` props.
  - **breaking change** remove unused `valueless prop
- **breaking change**: Remove `Toggle` component
- Misc changes to account for form field changes:
  - Update Card.ActionsSearch to use formsize small
  - Internal updates in FilterForm to account for FormField differences
  - Remove unnecessary option parsing from `ColumnSelect` component (Select does its own selection parsing)
  - Tweak `Text` component so that `medium` size is default rather than `null`. This aligns with how size is used in `FormFields` and produces no breaking chnages because the default is still the same.

# 5.0.0-alpha.7

- Always reveal view all reports link for My Reports
- Add color palettes to styleguidist

# 5.0.0-alpha.6

- Add the ability to pass a classname to sidebar
- Adding a two tone optoin to the code icon

# 5.0.0-alpha.5

- Include the clicked date range option as a param in Datepicker callback

# 5.0.0-alpha.4

- Bug fix: correct propTypes on Checkbox required prop

# 5.0.0-alpha.3

Sidebar component:

- Add badge for number of custom reports
- Fix the logo to the top of page and contain scroll to main content
- Always enable open/close on sections with sub items
- Call out “view all reports…”
- Increase # of visible reports
- Fix karet not rendering bug
- Sort reports by last updated
- Fix bug whereby changing report name loses active state
- Fix bug whereby navigating from “view all reports…” page loses active state

Filters component:

- Filters component should show form, not “Add” button, if no filters exist
- Filters component should not render cancel button if no filters exist

Accordion component:

- Let accordion render a badge next to section title

Tag Component

- Update base styles
- Bester silo nested click events
- Improve markdown in styleguide

Timeseries

- Remove icon

Fix regressions in three areas:

- Datagrid search (broken)
- Series limits and Groups limits (broken)
- Active/hover states for component cards (got lost in styleguide updates)

# 5.0.0-alpha.2

- Fix for the management of children using react-hot-loader
- Updated readme
- Allow non string/number columns in tables
- Updates to sketch library
- Guide for updating components to 5.0
- Deprecating the Saving, Toggle, Stencil, Slidein, Progress, BlankSlate, and Pagenav components

# 5.0.0-alpha.1

- - **breaking change**: Completely remove `Panel` component
- Adds `elevation` prop controlling box-shadow elevation
- **breaking change** Removes `style` prop, so that `style` can be used to pass the card inline-styles
- Adds `secondary` card (controlled by new `type` prop)
- Adds `as` prop for dynamic element rendering
- **breaking change** Adds `selectable` prop. Previously, a card was considered selectable if it was passed an `onClick` handler. This separates the handler from the boolean rendering logic.
- **breaking change** removes `width` and `height` props. Users can now specify explicit widths and heights via inline styles: `<Card style={{ width: 40, height: 60 }} />`
- Pass through all extra props to the inner element
- Substantially update Card documentation in styleguidist

# 4.16.2

- Upgrade dev dependencies
- Update tooltip position on hover over the target element

# 4.16.1

- Add `secondary` boolean prop to SplitButton to use the secondary background color
- Update Sketchfiles
- Set default apply apply label

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
