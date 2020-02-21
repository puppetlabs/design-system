## Overview

Icons and logos are designed to have consistency in style and spacing. They are output as SVG elements and wrapped in components.

### Rendering Icons

To render an icon, either:

- Provide a type and a size (size optional)
- Provide an svg and a viewBox

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
        Icons with a <em>green</em> background are the unique SVGs created by
        the UX team. Scaled SVGs with a <em>white</em> background should be
        approved before using.
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

## Custom SVG use

To use a custom SVG not included in the chart above, separately specify both the `path` attribute to the `svg` prop and the `viewBox` attribute to the `viewBox` prop.

Below we render the GitHub logo.

```jsx
const Renderer = () => {
  const customIcon = {
    viewBox: '0 0 16 16',
    svg: (
      <path
        fill="#818f99"
        fillRule="evenodd"
        d="M8 .2A8 8 0 0 0 5.47 15.79c.4.074.546-.173.546-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.889-1.17-.889-1.17-.726-.496.055-.486.055-.486.803.056 1.226.824 1.226.824.713 1.222 1.872.87 2.328.665.073-.517.279-.87.508-1.07-1.777-.201-3.644-.888-3.644-3.953 0-.874.312-1.588.823-2.147-.082-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82A7.662 7.662 0 0 1 8 4.068c.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.436 1.101.162 1.915.08 2.117.512.56.822 1.273.822 2.147 0 3.073-1.87 3.75-3.653 3.947.287.247.543.735.543 1.482 0 1.069-.01 1.932-.01 2.194 0 .214.144.463.55.385A8 8 0 0 0 8 .2"
      />
    ),
  };

  return (
    <div className="rc-sg-wrapper">
      <Icon svg={customIcon.svg} viewBox={customIcon.viewBox} />
    </div>
  );
};
<Renderer />;
```

## Adding icons to the Design System

1. _Design_: Create a new icon following the checklist and naming conventions on the [Iconography](#/Foundations/Iconography) Foundations page.
2. _Engineering_: Run the SVG through [svgo](https://github.com/svg/svgo) to minify and remove redundant data.
3. _Engineering_: Strip out the wrapping `svg` element, usually (but not always) leaving just a `path`.
4. _Engineering_: Add the icon to [icons.js](https://github.com/puppetlabs/design-system/blob/master/packages/react-components/source/react/library/icon/icons.js), specifying the icon name and native SVG sizes (usually "medium" for 16px but optionally also "tiny" for 8px, "small" for 12px, or "large" for 24px).

## Related

- [Button](#/React%20Components/Button): Buttons are able to render an icon as part of the component
- [ButtonSelect](#/React%20Components/ButtonSelect)
- [Iconography](#/Foundations/Iconography) (Foundations)