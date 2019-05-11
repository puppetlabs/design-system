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
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ButtonSelect
    id="action-menu-one"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value}
    onChange={value => setState({ value })}
  />
</div>
```
