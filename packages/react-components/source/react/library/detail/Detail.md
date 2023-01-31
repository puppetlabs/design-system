## Overview

The `Detail` component provides consistent PDS styling for the html [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element. 

## Basic Use

All content is shown and hidden using the underlying [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element. This component works out-of-the-box but can be controlled with the `open`, `onClose`, and `onOpen` props.

```jsx
  <div style={{maxWidth: '200px', border: `1px solid grey`, padding: '12px'}} >
    <Detail title="Example 1">
		<div style={{padding: '12px'}}>
			Show me!!  Really long description lorem ipsum, lorem ipsumus, lorem long description
			lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long description
			lorem ipsum, lorem ipsumus, lorem long description lorem ipsum, lorem
			ipsumus, loremus lorem ipsum.
		</div>
	</Detail>
	<Detail title="Example 2" divider={false}>
		<div style={{padding: '12px'}}>
			Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem long description
			lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long description
			lorem ipsum, lorem ipsumus, lorem long description lorem ipsum, lorem
			ipsumus, loremus lorem ipsum.
		</div>
	</Detail>
  </div>
```

### Arrow Position

Arrow icons are shown using css. Setting the `arrow` prop to `after` will display the arrow icon after the heading

```jsx
  <div style={{maxWidth: '200px', border: `1px solid grey`, padding: '12px'}} >
    <Detail title="Example 1" arrow='after'>
		<div style={{padding: '12px'}}>
			Show me!!  Really long description lorem ipsum, lorem ipsumus, lorem long description
			lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long description
			lorem ipsum, lorem ipsumus, lorem long description lorem ipsum, lorem
			ipsumus, loremus lorem ipsum.
		</div>
	</Detail>
	<Detail title="Example 2" divider={false} arrow='after'>
		<div style={{padding: '12px'}}>
			Now show me!! Really long description lorem ipsum, lorem ipsumus, lorem long description
			lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long description
			lorem ipsum, lorem ipsumus, lorem long description lorem ipsum, lorem
			ipsumus, loremus lorem ipsum.
		</div>
	</Detail>
  </div>
```