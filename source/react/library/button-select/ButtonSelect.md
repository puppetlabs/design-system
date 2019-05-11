The ButtonSelect component allows users to execute actions from a dropdown menu list appearing below a button element. It can be rendered with the full set of stylistic options available to the button component. It supports both imperative actions handled with click events and navigation actions with anchor tags.

### Basic use

Actions are specified by entries in an `actions` array prop. In most cases, action callbacks should be specified with the `onClick` property of each action item. If the action involves navigation, an anchor tag or custom link component with appropriate props (`href` or `to`) specifying the navigation location. Each action can optionally include an icon.
```
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
  { value: 'seven', label: 'Seven' },
  { value: 'eight', label: 'Seven' },
  { value: 'nine', label: 'Seven' },
  { value: 'ten', label: 'Seven' }
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ButtonSelect
    id="action-menu-one"
    options={options}
    placeholder="Select one"
    style={style}
    multiple
  />
</div>
```
