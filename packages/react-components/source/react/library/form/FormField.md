`Form.Field` is a wrapper around individual input elements that provides decoration such as input labels, error messages, descriptions, and validation. It is designed to be used inside the `<Form />` parent component and may not function properly otherwise. As such, please see [Form](#form) documentation for examples of correct use.

The component delegates the rendering of individual form input fields to sub components chosen via the `type` prop. Each type option corresponds with a specific type of data so that there is a direct mapping between input types and resulting data structure. Each sub-component may have its own specific set of props and options that are propagated forward from `<Form.Field>`. Please see each resulting input's documentation for details.

The current available string `type` values are detailed in the table below. We intend to add more over time.

| Type           | Component                    | Data Type         | Description                                         |
| -------------- | ---------------------------- | ----------------- | --------------------------------------------------- |
| text (default) | [Input](#input)              | string            | Standard html text input                            |
| email          | [Input](#input)              | string            | Html email input with browser validation            |
| password       | [Input](#input)              | string            | Hidden password input                               |
| url            | [Input](#input)              | string            | Url input with browser validation                   |
| search         | [Input](#input)              | string            | Html 'search' type input                            |
| number         | [Input](#input)              | number            | Html number input with stepper                      |
| multiline      | [Input](#input) (multiline)  | string            | Html textarea for long strings                      |
| checkbox       | [Checkbox](#checkbox)        | boolean           | Html checkbox                                       |
| switch         | [Switch](#switch)            | boolean           | Another boolean input designed to denote 'on / off' |
| select         | [Select](#select)            | string            | Dropdown selection                                  |
| multiselect    | [Select](#select) (multiple) | Array&ltstring&gt | Dropdown selection allowing multiple options        |

In addition it is possible to pass in a custom input component via the `type` prop:

```jsx static
<Form.Field type={MyCustomInput} />
```

The component must satisfy the following common interface:

```js static
const formInputInterface = {
  /** Input name */
  name: PropTypes.string.isRequired,
  /**
   * Input type. Passed to formInputs so that a single component may handle
   * multiple input types. For example, the Input handles both number and text
   * inputs.
   */
  type: PropTypes.string,
  /**
   * Input label. Passed to individual form elements so that the label value
   * may be used internally. For example, the value next to a checkbox will be
   * a duplication of the label.
   */
  label: PropTypes.string,
  /** Current value of the input */
  value: PropTypes.any,
  /** Alternate inline display format */
  inline: PropTypes.bool,
  /** Change handler. **Must be passed the intended new value of the input** */
  onChange: PropTypes.func,
  /** Form elements come in two standard sizes, medium (default), and small */
  size: PropTypes.oneOf(['medium', 'small']),
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Is the input required? */
  required: PropTypes.bool,
  /** Form error to indicate error state */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
```
