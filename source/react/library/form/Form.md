```
<Form>
  <Form.Field
    control={ Input }
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    control={ Input }
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
    control={ Input }
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
    control={ Select }
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
    control={ Input }
    label="First name"
    placeholder="Enter your first name..."
    description="Please enter your first name"
  />
  <Form.Field
    control={ Input }
    label="Last name"
    placeholder="Enter your last name..."
    description="Please enter your last name"
  />
  <Form.Field
    control={ Toggle }
    label="Likes cheese"
  />
</Form>
```
