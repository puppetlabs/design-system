## Overview

The `Navigation` component was designed and developed to be used as the primary app navigation. Care has been taken to make sure it is accessible (and if any accessibility issues are discovered, please file a PDS bug.) It is made up of the primary `Navigation` component but can be composed by using the `Navigation.Header`, `Navigation.Navigation`, `Navigation.Section`, `Navigation.Item`, and `Navigation.Footer` components. It does not currently support nesting beyond items in sections.

## Basic use

Affix the Navigation to the left side of the app, stack `Navigation.Header`, `Navigation.Navigation`, and `Navigation.Footer` inside `Navigation`, and add a `Navigation.Item` for each navigation item. Multiple `Navigation.Item` components may optionally be grouped inside `Navigation.Section` components to add named sections.

The Navigation component is stateless so you will need to manage which `Navigation.Item`
is currently highlighted with the `active` prop or use it with React Router's
[NavLink](https://reacttraining.com/react-router/web/api/NavLink) component,
which will apply an `active` class when the URL matches the defined route, e.g.:

```jsx static
<Navigation.Item title="Hello" as={NavLink} to="/hello" />
```

Following the `as` pattern in use in many Design System components, you may change `Navigation.Header` from a button to a link by adding `as="a" href="/"` as shown below or `as={Link} to="/"` if using React Router.

```jsx
import Badge from '../badge';

<div style={{ position: 'relative', height: '500px' }}>
  <Navigation>
    <Navigation.Header
      logo="pipelines"
      ariaLabel="Return to the home page"
      as="a"
      href="/"
    />
    <Navigation.Navigation>
      <Navigation.Item
        onClick={() => {}}
        title="Home"
        icon="home"
        active
        containerElement="div"
      />
      <Navigation.Section label="reports">
        <Navigation.Item onClick={() => {}} title="Code" icon="code" />
        <Navigation.Item onClick={() => {}} title="Build" icon="build" count={5} />
        <Navigation.Item
          onClick={() => {}}
          title="Deploy"
          icon="rocket"
          badge={
            <Badge pill type="success">
              4
            </Badge>
          }
        />
      </Navigation.Section>
      <Navigation.Section label="config">
        <Navigation.Item
          onClick={() => {}}
          title="Connections"
          icon="connections"
          label="config"
        />
      </Navigation.Section>
    </Navigation.Navigation>
    <Navigation.Footer
      profileIcon={
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100" />
      }
      username="Lorem Ipsum"
      version="1969.7.20"
      onClick={console.log}
    />
  </Navigation>
</div>;
```

## Variations

### Minimized Navigation

Add the `minimized` boolean prop to Navigation to render a narrow version with icons and no text for Navigation items. This may be used for responsive designs on small screens.

```jsx
<div style={{ position: 'relative', height: '500px' }}>
  <Navigation minimized>
    <Navigation.Header
      logo="pipelines"
      onClick={() => console.log('logo clicked')}
      ariaLabel="Return to the home page"
    />
    <Navigation.Navigation>
      <Navigation.Item
        onClick={() => {}}
        title="Home"
        icon="home"
        active
        containerElement="div"
      />
      <Navigation.Section label="reports">
        <Navigation.Item onClick={() => {}} title="Code" icon="code" />
        <Navigation.Item onClick={() => {}} title="Build" icon="build" />
        <Navigation.Item onClick={() => {}} title="Deploy" icon="rocket" />
      </Navigation.Section>
      <Navigation.Section label="config">
        <Navigation.Item
          onClick={() => {}}
          title="Connections"
          icon="connections"
          label="config"
        />
      </Navigation.Section>
    </Navigation.Navigation>
    <Navigation.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Navigation>
</div>
```

## Related

- [SidePanel](#/React%20Components/SidePanel)
