```
const movieOptions = [
  'American Treasure',
  'Ghost Rider',
  'Kick-Ass',
];

initialState = {
  firstName: 'Hi',
  lastName: 'There',
  password: "",
  favoriteMovie: "",
  notARobot: false
};

<Form
  submittable
  cancellable
  initialValues={state}
  onSubmit={values => setState(values)}
>
  <Form.Section>
    <Form.Field
      type="text"
      name="firstName"
      label="First name"
      placeholder="Enter your first name..."
      description="Please enter your first name"
      validator={field => field.length % 2 === 0 ? false : 'this is bad'}
    />
    <Form.Field
      type="text"
      name="lastName"
      label="Last name"
      placeholder="Enter your first name..."
      description="Please enter your last name"
    />
  </Form.Section>
  <Form.Field
    type="password"
    name="password"
    label="Password"
    placeholder="Enter your password..."
    description="Please enter your password"
  />
  <Form.Field
    type="select"
    name="favoriteMovie"
    label="favorite movie"
    options={movieOptions}
    description="What is your favorite movie?"
  />
  <Form.Field
    type="checkbox"
    name="notARobot"
    label="Not a robot"
    description="Are you a human?"
    tooltip="We only allow real people to sign up. No robots, yet."
  />
</Form>
```
