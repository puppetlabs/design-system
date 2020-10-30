## Overview

Avatar is an icon or figure representing a particular user of the application. The component can be adapted to use images, icons, or letters.

## Type

### Image Avatar

```jsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Avatar>
    <img
      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100"
      alt="placeholder"
    />
  </Avatar>
  <Avatar>
    <img
      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100"
      alt="placeholder"
    />
  </Avatar>
  <Avatar>
    <img
      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100"
      alt="placeholder"
    />
  </Avatar>
</div>
```

### Letter Avatar

```jsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Avatar>
    <span>R</span>
  </Avatar>
  <Avatar style={{ backgroundColor: '#ffae1a' }}>
    <span>M</span>
  </Avatar>
  <Avatar style={{ backgroundColor: '#11d1c4', color: '#ffffff' }}>
    <span>T</span>
  </Avatar>
</div>
```

### Sizes

```jsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Avatar size={{ width: '32px', height: '32px' }}>
    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100" />
  </Avatar>
  <Avatar size={{ width: '40px', height: '40px' }}>
    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100" />
  </Avatar>
  <Avatar size={{ width: '48px', height: '48px' }}>
    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100" />
  </Avatar>
</div>
```
