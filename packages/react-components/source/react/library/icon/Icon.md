## Overview

Icons and logos are designed to have consistency in style and spacing. They are output as SVG elements and wrapped in components.

### Accessibility

**Warning**: Be aware that icons render as SVGs that cannot be accessed with tabs or screen reader software. For interactivity, consider using the [Button](#/React%20Components/Button) component with the `icon` prop and a `type` of "transparent".

See also: [Button](#/React%20Components/Button) and [Button Select](#/React%20Components/ButtonSelect)

### Rendering Icons

To render an icon, either:

- Provide a type and a size (size optional)
- Provide an svg and a viewBox

The specific SVG rendered is decided by the following:

1. If there is a unique SVG for the type and size provided, it will be rendered. Unique SVGs are indicated by a green background below.
2. Otherwise, we scale down the next largest SVG, or if unavailable, scale up the next smallest SVG.

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

## Customize icon color

If you need a different color, you can customize it with CSS, targeting the `fill` property. The default color is defined in [_icons.scss](https://github.com/puppetlabs/design-system/blob/main/packages/react-components/source/scss/library/components/_icons.scss). You should be able to do something like `.your-icon { fill: $puppet-purple; }` with Sass.

```jsx
<Icon type="activity" style={{ fill: '#a263ff' }} />
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

1. Run the SVG through [svgo](https://github.com/svg/svgo) to minify and remove redundant data.
2. Note the viewBox dimensions and choose the appropriate size: tiny (8px x 8px), small (12px x 12px), medium (16px x 16px), or large (24px x 24px). Most icons only use a single base size of medium.
3. Strip out the wrapping `svg` element, usually (but not always) leaving just a `path`.
4. Remove all instances of the `fill` attribute so that icons can be styled with CSS. You may also remove `clip-rule` attributes.
5. Rename dasherized attributes like `fill-rule` with React-compatible properties like `fillRule`.
6. Add the icon to [icons.js](https://github.com/puppetlabs/design-system/blob/main/packages/react-components/source/react/library/icon/icons.js) in alphabetical order, specifying the icon name and native SVG sizes (from step 2).

## Disclaimer

These icons include material from third parties and may be protected by their own, independent trademarks. Use of these materials is for illustrative purposes only and is not intended to infringe on the copyright or trademark of any of these third parties. Use of these materials does not imply endorsement by Puppet of the trademark holders.

## Related

- [Logo](#/React%20Components/Logo)
- [Button](#/React%20Components/Button) Buttons are able to render an icon as part of the component)
- [Iconography](#/Foundations/Iconography) (in Foundations)
