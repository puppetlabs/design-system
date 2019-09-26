<small class="rsg--pathline-29">Sketch symbol: puppet-ui-library / Icons</small>

## Overview

Icons and logos are designed to have consistency in style and spacing. They are output as SVG elements and wrapped in components.

Design and size specifications can be found in the Sketch Styleguide file.

### Rendering Icons

To render an icon, either:

* Provide a type and a size (size optional)
* Provide an SVG and a viewBox

The specific SVG rendered is decided by the following:

1. If there is a unique SVG for the type and size provided, it will be rendered. Unique SVGs are indicated by a green background below.
2. Otherwise, we scale down the next largest SVG, or if unavailable, scale up the next smallest SVG.

See also: [Button](#/React%20Components/Button) and [Button Select](#/React%20Components/ButtonSelect)

## Basic Use

Below is a chart of existing icons. Note that there are varying scales and levels of detail for each icon. Make sure that your icon size is consistent throughout your product.

```jsx
import Alert from '../alert';
import icons from './icons';

const Renderer = () => {
  const names = Object.keys(icons);
  const components = [];

  for (var i = 0; i < names.length; i++) {
    // Unique icon variants have colored bg
    const variants = Object.keys(icons[names[i]] || {});
    const isUnique = size => variants.includes(size);

    components.push(
      <tr key={i}>
        <td key={names[i]}>{names[i]}</td>

        <td
          className={isUnique('tiny') ? 'rc-icon-unique-variant' : ''}
          key={names[i] + `-tiny`}
        >
          <Icon type={names[i]} size="tiny" />
        </td>

        <td
          className={isUnique('small') ? 'rc-icon-unique-variant' : ''}
          key={names[i] + `-small`}
        >
          <Icon type={names[i]} size="small" />
        </td>

        <td
          className={isUnique('medium') ? 'rc-icon-unique-variant' : ''}
          key={names[i] + `-medium`}
        >
          <Icon type={names[i]} size="medium" />
        </td>

        <td
          className={isUnique('large') ? 'rc-icon-unique-variant' : ''}
          key={names[i] + `-large`}
        >
          <Icon type={names[i]} size="large" />
        </td>
      </tr>,
    );
  }

  return (
    <div className="rc-sg-wrapper">
      <Alert type="success">
        Icons with a <em>green</em> background are the unique SVGs created by the UX team. Scaled SVGs with a <em>white</em> background should be approved before using.
      </Alert>
      <br />
      <table className="rc-icon-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tiny</th>
            <th>Small</th>
            <th>Medium (default)</th>
            <th>Large</th>
          </tr>
        </thead>
        <tbody>{components}</tbody>
      </table>
    </div>
  );
};
<Renderer />;
```
## Related

* [Button](#/React%20Components/Button) : buttons are able to render an icon as part of the component
* [Button Select](#/React%20Components/ButtonSelect)
