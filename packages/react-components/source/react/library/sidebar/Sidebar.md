## Overview

The `Sidebar` component was designed and developed to be used as the primary app navigation. Care has been taken to make sure it is accessible (and if any accessibility issues are discovered, please file a PDS bug.) It is made up of the primary `Sidebar` component but can be composed by using the `Sidebar.Header`, `Sidebar.Navigation`, `Sidebar.Section`, `Sidebar.Item`, and `Sidebar.Footer` components. It does not currently support nesting beyond items in sections.

## Basic use

Affix the Sidebar to the left side of the app, stack `Sidebar.Header`, `Sidebar.Navigation`, and `Sidebar.Footer` inside `Sidebar`, and add a `Sidebar.Item` for each navigation item. Multiple `Sidebar.Item` components may optionally be grouped inside `Sidebar.Section` components to add named sections.

The Sidebar component is stateless so you will need to manage which `Sidebar.Item`
is currently highlighted with the `active` prop or use it with React Router's
[NavLink](https://reacttraining.com/react-router/web/api/NavLink) component,
which will apply an `active` class when the URL matches the defined route, e.g.:

```jsx static
<Sidebar.Item title="Hello" as={NavLink} to="/hello" />
```

Following the `as` pattern in use in many Design System components, you may change `Sidebar.Header` from a button to a link by adding `as="a" href="/"` as shown below or `as={Link} to="/"` if using React Router.

```jsx
import Badge from '../badge';

<div style={{ position: 'relative', height: '500px' }}>
  <Sidebar>
    <Sidebar.Header
      logo="security-compliance-management"
      ariaLabel="Return to the home page"
      as="a"
      href="/"
    />
    <Sidebar.Navigation>
      <Sidebar.Item
        onClick={() => {}}
        title="Home"
        icon="home"
        active
        containerElement="div"
      />
      <Sidebar.Section label="reports">
        <Sidebar.Item onClick={() => {}} title="Code" icon="code" />
        <Sidebar.Item onClick={() => {}} title="Build" icon="build" count={5} />
        <Sidebar.Item
          onClick={() => {}}
          title="Deploy"
          icon="rocket"
          badge={
            <Badge pill type="success">
              4
            </Badge>
          }
        />
      </Sidebar.Section>
      <Sidebar.Section label="config">
        <Sidebar.Item
          onClick={() => {}}
          title="Connections"
          icon="connections"
          label="config"
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer
      profileIcon={
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100" />
      }
      username="Lorem Ipsum"
      version="1969.7.20"
      onClick={console.log}
      enableSignout
      onSignout={console.log}
      signoutTooltip="This is a custom tooltip"
    />
  </Sidebar>
</div>;
```

## Variations

### Minimized Sidebar

Add the `minimized` boolean prop to Sidebar to render a narrow version with icons and no text for Sidebar items. This may be used for responsive designs on small screens.

```jsx
<div style={{ position: 'relative', height: '500px' }}>
  <Sidebar minimized>
    <Sidebar.Header
      logo="security-compliance-management"
      onClick={() => console.log('logo clicked')}
      ariaLabel="Return to the home page"
    />
    <Sidebar.Navigation>
      <Sidebar.Item
        onClick={() => {}}
        title="Home"
        icon="home"
        active
        containerElement="div"
      />
      <Sidebar.Section label="reports">
        <Sidebar.Item onClick={() => {}} title="Code" icon="code" />
        <Sidebar.Item onClick={() => {}} title="Build" icon="build" />
        <Sidebar.Item onClick={() => {}} title="Deploy" icon="rocket" />
      </Sidebar.Section>
      <Sidebar.Section label="config">
        <Sidebar.Item
          onClick={() => {}}
          title="Connections"
          icon="connections"
          label="config"
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
</div>
```

## Related

- [SidePanel](#/React%20Components/SidePanel)
