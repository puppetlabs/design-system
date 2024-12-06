## Overview

The `Detail` is a lightly styled wrapper around the HTML [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element. This component provides a simple way to show or hide elements within a menu or block of content.

## Basic Use

All content is shown and hidden using the underlying [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element. This component works out-of-the-box but can be controlled with the `open`, `onClose`, and `onOpen` props.

```jsx
<div style={{ maxWidth: '200px', border: `1px solid grey`, padding: '12px' }}>
  <Detail title="Example 1">
    <div style={{ padding: '12px' }}>
      Show me!! Really long description lorem ipsum, lorem ipsumus, lorem long
      description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long
      description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
  <Detail title="Example 2" divider={false}>
    <div style={{ padding: '12px' }}>
      Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem
      long description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really
      long description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
</div>
```

### Arrow Position

Arrow icons are shown using css. Setting the `arrow` prop to `after` will display the arrow icon after the heading

```jsx
<div style={{ maxWidth: '200px', border: `1px solid grey`, padding: '12px' }}>
  <Detail title="Example 1" arrow="after">
    <div style={{ padding: '12px' }}>
      Show me!! Really long description lorem ipsum, lorem ipsumus, lorem long
      description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long
      description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
  <Detail title="Example 2" divider={false} arrow="after">
    <div style={{ padding: '12px' }}>
      Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem
      long description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really
      long description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
</div>
```

### Disabling

To disable the element, set the disabled prop to true. A disabled Detail will not show its content.

```jsx
<div style={{ maxWidth: '200px', border: `1px solid grey`, padding: '12px' }}>
  <Detail open disabled title="Example 1" arrow="after">
    <div style={{ padding: '12px' }}>
      Show me!! Really long description lorem ipsum, lorem ipsumus, lorem long
      description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long
      description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
  <Detail disabled title="Example 2" divider={false} arrow="after">
    <div style={{ padding: '12px' }}>
      Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem
      long description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really
      long description lorem ipsum, lorem ipsumus, lorem long description lorem
      ipsum, lorem ipsumus, loremus lorem ipsum.
    </div>
  </Detail>
</div>
```

### Mounting

By default, the HTML [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element does not unmount it's content from the DOM when closed, however unmounting can be beneficial when working with React components that require a state reset when re-opened. As unmounting is usually the preferred behavior when hiding React components, the Details component will unmount its children when closed. The unmount can be prevented by setting `unmountOnClose` to false.

```jsx
const [willUnmount, setWillUnmount] = React.useState();
const [alwaysMounted, setAlwaysMounted] = React.useState();

const signalWith = fn => () => {
  fn('Mounted');
  return () => fn('Unmounted');
};

const AlwaysMounted = ({ children }) => {
  React.useEffect(signalWith(setAlwaysMounted), []);

  return <div style={{ padding: '12px' }}>{children}</div>;
};
const WillUnMount = ({ children }) => {
  React.useEffect(signalWith(setWillUnmount), []);

  return <div style={{ padding: '12px' }}>{children}</div>;
};

<div style={{ maxWidth: '200px', border: `1px solid grey`, padding: '12px' }}>
  <h6>{`Example 1: ${alwaysMounted}`}</h6>
  <h6>{`Example 2: ${willUnmount}`}</h6>

  <Detail unmountOnClose={false} title="Example 1">
    <AlwaysMounted title="Example 1" arrow="after">
      <div style={{ padding: '12px' }}>
        Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem
        long description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really
        long description lorem ipsum, lorem ipsumus, lorem long description
        lorem ipsum, lorem ipsumus, loremus lorem ipsum.
      </div>
    </AlwaysMounted>
  </Detail>
  <Detail title="Example 2" divider={false}>
    <WillUnMount>
      <div style={{ padding: '12px' }}>
        Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem
        long description lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really
        long description lorem ipsum, lorem ipsumus, lorem long description
        lorem ipsum, lorem ipsumus, loremus lorem ipsum.
      </div>
    </WillUnMount>
  </Detail>
</div>;
```
