## Overview

`Authentication` provides a standardized layout for authentication screens used for login, registration, "forgot password", or similar use-cases. It is designed to be composed with the `Form` component to provided whatever authentication-related use input is needed. It will display one of the official logos specified with a string key, or a custom generated logo specified with the `product` prop. See [Logo](#/React%20Components/Logo) for more information.

# Example: Login

```jsx
import { Form, Logo } from '@puppet/react-components';

const FooterExample = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Logo style={{ height: '19px' }} product="puppet-standalone" />
      Puppet | Footer example
    </div>
  );
};

<Authentication
  product="My Product"
  title="Sign in to My Product"
  footer={<FooterExample />}
>
  <Form submittable actionsPosition="block" submitLabel="Sign in">
    <Form.Field
      type="email"
      name="email"
      autoComplete="username email"
      label="Email"
      required
      requiredFieldMessage="You must provide an email address"
      placeholder="Email address"
    />
    <Form.Field
      type="password"
      name="password"
      autoComplete="current-password"
      label="Password"
      required
      requiredFieldMessage="You must provide a password"
      placeholder="Enter password"
    />
  </Form>
  <Authentication.Action>Forgot your password?</Authentication.Action>
</Authentication>;
```

# Example: New User Confirmation

```jsx
import { Form } from '@puppet/react-components';

<Authentication
  product="My Product"
  title="Welcome to My Product"
  subtitle="To get started you'll need to confirm a few things and create a password"
>
  <Form submittable actionsPosition="block" submitLabel="Get started">
    <Form.Field
      type="text"
      name="name"
      label="Name"
      required
      requiredFieldMessage="You must provide a name"
      placeholder="Name"
    />
    <Form.Field
      type="email"
      name="email"
      autoComplete="username email"
      label="Email"
      required
      requiredFieldMessage="You must provide an email"
      placeholder="Email"
      readOnly
      disabled
    />
    <Form.Field
      type="text"
      name="company"
      label="Company"
      required
      requiredFieldMessage="You must provide a company"
      placeholder="Company"
    />
    <Form.Field
      type="password"
      name="passwordA"
      label="Password"
      autoComplete="new-password"
      required
      requiredFieldMessage="Please provide a password"
      placeholder="Password"
    />
    <Form.Field
      type="password"
      name="passwordB"
      label="Confirm password"
      autoComplete="new-password"
      required
      requiredFieldMessage="Please confirm your password"
      placeholder="Password again"
    />
  </Form>
</Authentication>;
```

## Related

- [Form](#/React%20Components/Form)
- [Logo](#/React%20Components/Logo)
