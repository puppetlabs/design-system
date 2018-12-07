```
const movieOptions = [
  'American Treasure',
  'Ghost Rider',
  'Kick-Ass',
];

<Form>
  <Form.Field
    type="text"
    name="firstName"
    label="First name"
    value=""
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    type="text"
    name="lastName"
    label="Last name"
    value=""
    placeholder="Enter your first name..."
    description="Please enter your last name"
  />
  <Form.Field
    type="password"
    name="password"
    label="Password"
    value=""
    placeholder="Enter your password..."
    description="Please enter your password"
  />
  <Form.Field
    inline
    type="select"
    name="favoriteMovie"
    label="favorite movie"
    options={movieOptions}
    value=""
    description="What is your favorite movie?"
  />
  <Form.Field
    inline
    type="checkbox"
    name="notARobot"
    label="Not a robot"
    value={true}
    description="Are you a human?"
    tooltip="We only allow real people to sign up. No robots, yet."
  />
</Form>
```

Form displaying an input with an error:

```
const errors = {
  name: 'Name is taken',
  age: 'You are not old enough!',
};

<Form errors={ errors }>
  <Form.Field
    type="text"
    name="name"
    label="name"
    value="John"
    description="Please enter your name"
  />
  <Form.Field
    inline
    type="number"
    name="age"
    label="age"
    value={ 5 }
  />
</Form>
```

Form with a `Select`:

```
const options = [
  'Oregon',
  'California',
  'New York',
  'Neverland',
];

<Form>
  <Form.Field
    type="select"
    name="state"
    label="State"
    description="Select a state"
    options={options}
    value=""
  />
</Form>
```

## Form with sections

```
const yAxisFlyout = (
  <Form.Flyout>
    <Form.Field
      type="text"
      name="alias"
      label="alias"
      value="My fun alias"
    />
  </Form.Flyout>
);

<Form>
  <Form.Field
    key="form-section-1"
    type="text"
    name="title"
    label="title"
    value=""
  />
  <Form.Section title="X-Axis" tooltip="Edit the X Axis here" key="form-section-2">
    <Form.Field
      type="text"
      name="xAxisDimensions"
      value="my dimension"
      label="dimensions"
      value=""
    />
    <Form.Field
      type="text"
      name="xAxisMetrics"
      label="metrics"
      value=""
    />
  </Form.Section>
  <Form.Section title="Y-Axis" flyout={ yAxisFlyout } key="form-section-3">
    <Form.Field
      type="text"
      name="yAxisMetrics"
      label="metrics"
    />
  </Form.Section>
</Form>
```

## Inline form with validation

You must fill out the various fields for the form to be submittable.

```
const validator = (values) => {
  errors = {};

  if (!values.firstName) {
    errors.firstName = 'You must supply a first name';
  }

  if (!values.lastName) {
    errors.lastName = 'You must supply a last name';
  }

  if (!values.cheese) {
    errors.cheese = 'Come on, everyone likes cheese.';
  }

  return errors;
};

<Form
  inline
  submittable
  validator={ validator }
  onSubmit={ (values) => { alert(`submitted ${JSON.stringify(values)}`) } }
>
  <Form.Field
    type="text"
    name="firstName"
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
    value=""
  />
  <Form.Field
    type="text"
    name="lastName"
    label="Last name"
    placeholder="Enter your last name..."
    description="Please enter your last name"
    value=""
  />
  <Form.Field
    name="cheese"
    value={ false }
    type="switch"
    label="Likes cheese"
  />
</Form>
```

## Form with actions

Default actions are on the right

```
<Form submittable cancellable>
  <Form.Field
    type="text"
    name="firstName"
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    type="text"
    name="lastName"
    label="Last name"
    value=""
    placeholder="Enter your first name..."
    description="Please enter your last name"
  />
</Form>
```

Actions to the left with actionsPosition

```
<Form submittable cancellable actionsPosition="left">
  <Form.Field
    type="text"
    name="firstName"
    label="First name"
    options="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    type="text"
    name="lastName"
    label="Last name"
    value=""
    options="Enter your first name..."
    description="Please enter your last name"
  />
</Form>
```
