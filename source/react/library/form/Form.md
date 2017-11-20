```
<Form>
  <Form.Field
    type="input"
    name="firstName"
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    type="input"
    name="lastName"
    label="Last name"
    placeholder="Enter your last name..."
    description="Please enter your last name"
  />
</Form>
```

Form displaying an input with an error:

```
<Form>
  <Form.Field
    type="input"
    label="name"
    error="This name is already taken"
    value="Jeff"
    description="Please enter your name"
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
    label="State"
    description="Select a state"
    options={ options }
  />
</Form>
```

## Inline form

```
<Form inline>
  <Form.Field
    type="input"
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    type="input"
    label="Last name"
    placeholder="Enter your last name..."
    description="Please enter your last name"
  />
  <Form.Field
    type="toggle"
    label="Likes cheese"
  />
</Form>
```
