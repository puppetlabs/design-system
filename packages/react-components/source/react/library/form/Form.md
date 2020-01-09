The `Form` component encapsulates user data entry of various data types, with consistent styling, error handling, validation. To maintain consistency and accessibility, this should be considered the primary API for user input in Puppet apps.

The `Form` component must be used in conjunction with one or more [Form.Field](#formfield) sub-components controlling individual inputs. In general, the `Form.Field` sub-components are responsible for basic rendering and user input handling while the parent `Form` component is responsible for tracking the entire form's value, handling form submission and cancellation, and coordinating form field errors and validation. For more information on available props and options for the `Form.Field` sub-component, see [here](#formfield).

### Uncontrolled (recommended in most cases)

In _uncontrolled_ mode, the Form component tracks field values in internal state. The form may be supplied an initialValues object prop with each field name and its initial value, and a submit handler that is passed the final values. When new `initialValues` are detected, the component is reset (see [error handling](#linkylink) below).

```jsx
const movieOptions = [
  { value: 'american-treasure', label: 'American Treasure' },
  { value: 'ghost-rider', label: 'Ghost Rider' },
  { value: 'point_break', label: 'Point Break' },
];

const initialValues = {
  controlledFirstName: 'Sponge',
  controlledLastName: 'Bob',
  controlledPassword: '',
  controlledFavoriteMovie: '',
  controlledNotARobot: false,
};

/** Mock api call method */
const submitForm = values => values;

class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: initialValues,
      submitting: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.setState({ submitting: true });

    submitForm(values);

    this.setState({ submitting: false, values });
  }

  render() {
    const { values, submitting } = this.state;

    return (
      <Form
        submittable
        cancellable
        initialValues={values}
        submitting={submitting}
        onSubmit={this.onSubmit}
      >
        <Form.Field
          type="text"
          name="controlledFirstName"
          autoComplete="firstname"
          label="First name"
          placeholder="Enter your first name..."
        />
        <Form.Field
          type="text"
          name="controlledLastName"
          autoComplete="lastname"
          label="Last name"
          placeholder="Enter your last name..."
        />
        <Form.Field
          type="password"
          autoComplete="current-password"
          name="controlledPassword"
          label="Password"
          placeholder="Enter your password..."
          description="Please enter your password"
          error="You goofed up now"
        />
        <Form.Field
          type="select"
          name="controlledFavoriteMovie"
          label="favorite movie"
          placeholder="Choose a movie"
          options={movieOptions}
        />
        <Form.Field
          type="checkbox"
          name="controlledNotARobot"
          label="Not a robot"
          description="Are you a human?"
        />
      </Form>
    );
  }
}

<MyPage />;
```

### Controlled

In _controlled_ mode, the consumer is responsible for managing form value state. This is used most commonly when the field values may change from external sources or if changes to the values are automatically reflected elsewhere in the ui. The form must be passed a `values` object prop with keys corresponding to field names, and an 'onChange' handler that updates external state.

```jsx
const movieOptions = [
  { value: 'american-treasure', label: 'American Treasure' },
  { value: 'ghost-rider', label: 'Ghost Rider' },
  { value: 'point_break', label: 'Point Break' },
];

const initialValues = {
  firstName: 'Johnny',
  lastName: 'Blaze',
  password: '',
  favoriteMovie: '',
  notARobot: false,
};

/** Mock api call method */
const submitForm = values => values;

class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: initialValues,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(name, values) {
    console.log(`${name} field changed`);
    this.setState({ values });
  }

  render() {
    const { values } = this.state;

    return (
      <Form values={values} onChange={this.onChange}>
        <Form.Field
          type="text"
          name="firstName"
          autoComplete="firstname"
          label="First name"
          placeholder="Enter your first name..."
        />
        <Form.Field
          type="text"
          name="lastName"
          autoComplete="lastname"
          label="Last name"
          placeholder="Enter your last name..."
        />
        <Form.Field
          type="password"
          name="password"
          autoComplete="current-password"
          label="Password"
          placeholder="Enter your password..."
          description="Please enter your password"
          error="You goofed up now"
        />
        <Form.Field
          type="select"
          name="favoriteMovie"
          label="favorite movie"
          placeholder="Choose a movie"
          options={movieOptions}
        />
        <Form.Field
          type="checkbox"
          name="notARobot"
          label="Not a robot"
          description="Are you a human?"
        />
      </Form>
    );
  }
}

<MyPage />;
```

### Form variants

Variant styles are achieved by manipulating `labelType` and `inline` on the Form and/or individual FormFields. Below, all fields have been made inline and label text is not uppercased.

```jsx
const movieOptions = [
  { value: 'american-treasure', label: 'American Treasure' },
  { value: 'ghost-rider', label: 'Ghost Rider' },
  { value: 'point_break', label: 'Point Break' },
];

const initialValues = {
  controlledFirstName: 'Sponge',
  controlledLastName: 'Bob',
  controlledPassword: '',
  controlledFavoriteMovie: '',
  controlledNotARobot: false,
  controlledNotAHuman: false,
};

/** Mock api call method */
const submitForm = values => values;

class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: initialValues,
      submitting: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.setState({ submitting: true });

    submitForm(values);

    this.setState({ submitting: false, values });
  }

  render() {
    const { values, submitting } = this.state;

    return (
      <Form
        submittable
        cancellable
        initialValues={values}
        submitting={submitting}
        onSubmit={this.onSubmit}
        labelType="secondary"
        inline
      >
        <Form.Field
          type="text"
          name="controlledFirstName"
          autoComplete="firstname"
          label="First name"
          placeholder="Enter your first name..."
        />
        <Form.Field
          type="text"
          name="controlledLastName"
          autoComplete="lastname"
          label="Last name"
          placeholder="Enter your last name..."
        />
        <Form.Field
          type="password"
          autoComplete="current-password"
          name="controlledPassword"
          label="Password"
          placeholder="Enter your password..."
          description="Please enter your password"
          error="You goofed up now"
        />
        <Form.Field
          type="select"
          name="controlledFavoriteMovie"
          label="Long label to ask what your favorite movie is."
          placeholder="Choose a movie"
          options={movieOptions}
        />
        <Form.Field
          type="checkbox"
          name="controlledNotARobot"
          label="Not a robot"
          description="Are you a human?"
        />
        <Form.Field
          type="switch"
          name="controlledNotAHuman"
          label="Not a human"
          description="Are you a robot?"
        />
      </Form>
    );
  }
}

<MyPage />;
```
