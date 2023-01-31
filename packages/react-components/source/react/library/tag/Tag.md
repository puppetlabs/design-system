## Overview

The `Tag` component was designed and developed to be used primarily alongside the data grid filtering feature, as a clear indication of what filters are actively applied. However the component itself may have further use cases. The `Tag` component has been built on top of the `Button` component in order to make sure it inherit's all its accessability features.

## Basic Use

All text can be passed to the `Tag` as a child, a callback function can be passed to the onClick prop to catch a users interactions.

```jsx
const onTagClick = () => {
  console.log('The X was clicked');
};

<div>
  <div>
    <Tag label="Tag label" onClick={onTagClick} />
  </div>
</div>;
```

### Neutral

The neutral tag can be selected through the type prop. This type of the tag has been developed to be used for displaying currently active filters within your application. Currently we only support a neutral subtle component. This also requires an emphasis="subtle" prop to be added.

```jsx
const onTagClick = () => {
  console.log('The X was clicked');
};

<div>
  <div>
    <Tag
      label="Tag label"
      onClick={onTagClick}
      type="neutral"
      emphasis="subtle"
    />
  </div>
</div>;
```

### Static Tag

By adding `hideRemoveButton` to the tag component you can create a static tag in cases where you may want to disable the user from being able to remove it from a list.

```jsx
const onTagClick = () => {
  console.log('The X was clicked');
};

<div>
  <div>
    <Tag
      label="OS = 'Windows'"
      onClick={onTagClick}
      type="neutral"
      emphasis="subtle"
      hideRemoveButton
    />
  </div>
</div>;
```
### Tag Filter

Creates a list of tags from a menu of searchable / filterable options. Options will be grouped together based on the `group` property. Options without a group are displayed without a group header.

```jsx
import React from 'react';
import Button from '../Button';

const [selected, onApply] = React.useState([]);

const options = [{
	group: 'Humans',
	name: "sara",
	label: "Sarah Connor",
	
}, {
	group: 'Robots',
	name: "terminator",
	label: "Terminator"
},
{
	group: 'Robots',
	name: "johnny",
	label: "Johnny 5",
},
{
	group: 'Humans',
	name: "rocky",
	label: "Rocky Balboa"
},
{
	group: 'Robots',
	name: "optimus",
	label: "Optimus Prime",
},
{
	group: 'Robots',
	name: "hal",
	label: "Hal",
},
{
	group: 'Animals',
	name: "donald",
	label: "Donald Duck"
}, 
];

console.log('Selected', selected);
const selectedText = (count) => `${count} ${count === 1 ? 'tag' : 'tags'} selected`; 

<div>
<Button style={{marginBottom: '8px'}} onClick={() => {
	if(!selected.some(f => f.name === options[1].name)){
		onApply([...selected, options[1]])
	}
	}}>Terminate</Button>
  <div>
  {selected.reduce((acc, curr) => acc += ` ${curr.name};`, '')}
    <Tag.Filter
	  open={false}
	  onApply={onApply}
	  options={options}
	  selected={selected}
	  selectedLabel={selectedText}
	  clearLabel="Clear selected tags"
	  applyButtonLabel="Apply filters"
	  columns
    />
  </div>
</div>

```
## Related

- [Badge](#/React%20Components/Badge)
- [Button](#/React%20Components/Button)
