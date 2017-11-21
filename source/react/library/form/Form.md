```
const movieOptions = [
  'American Treasure',
  'Ghost Rider',
  'Kick-Ass',
];

<Form>
  <Form.Field
    type="input"
    name="firstName"
    label="First name"
    elementProps={ { placeholder: 'Enter your first name...' } }
    description="Please enter your first name"
  />
  <Form.Field
    type="input"
    name="lastName"
    label="Last name"
    value="Ice cream"
    elementProps={ { placeholder: 'Enter your first name...' } }
    description="Please enter your last name"
  />
  <Form.Field
    inline
    type="select"
    name="favoriteMovie"
    label="favorite movie"
    elementProps={ { options: movieOptions } }
    description="What is your favorite movie?"
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
    type="input"
    name="name"
    label="name"
    value="John"
    description="Please enter your name"
  />
  <Form.Field
    inline
    type="input"
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
    elementProps={ { options } }
  />
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
  <Form.Field
    name="cheese"
    value={ false }
    type="switch"
    label="Likes cheese"
  />
</Form>
```
