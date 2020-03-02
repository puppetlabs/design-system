## Overview

The `Tag` component was designed and developed to be used primarily alongside the data grid filtering feature, as a clear indication of what filters are actively applied. However the component itself may have further usecases. The `Tag` component has been built on top of the `Button` component in order to make sure it inherit's all its accessability features.

## Basic Use

All text can be passed to the `Tag` as a child, a callback function can be passed to the onClick prop to catch a users interactions.

```jsx
const onTagClick = () => {
  console.log('The X was clicked');
};

<div>
  <div>
    <Tag onClick={onTagClick}>Tag label</Tag>
  </div>
</div>;
```

## Related

- [Badge](#/React%20Components/Badge)
- [Button](#/React%20Components/Button)
