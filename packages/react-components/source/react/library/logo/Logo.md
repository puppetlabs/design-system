**Warning: Logos are subject to Puppet's [Trademark Policy](https://puppet.app.box.com/v/puppet-trademark-policy). Other legal documents are available at <https://puppet.com/legal>.**

## Overview

The logo component provides easy access to marketing-approved logos in our applications. A full set of official product logos may be specified by strings, in both full and bug variations. Additionally, an arbitrary logo may be rendered with the default puppet bug and a custom product name. Other components in the react component library, most prominently, the [Sidebar](#sidebar) are designed to work out-of-the-box with this component.

Custom logos should be used internally only. All public facing products should be given official trademarked logos through marketing.

## Variations

### Standard

The standard style variation exists for light backgrounds.

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo product="container-registry" style={{ margin: 5 }} />
  <Logo product="discovery" style={{ margin: 5 }} />
  <Logo product="enterprise" style={{ margin: 5 }} />
  <Logo product="insights" style={{ margin: 5 }} />
  <Logo product="nebula" style={{ margin: 5 }} />
  <Logo product="pipelines" style={{ margin: 5 }} />
  <Logo product="remediate" style={{ margin: 5 }} />
  <Logo product="relay" style={{ margin: 5 }} />
  <Logo product="comply" style={{ margin: 5 }} />
  <Logo product="My Product" style={{ margin: 5 }} />
</div>
```

### Inverted

This style variation exists for dark backgrounds, where the Puppet logo uses white.

```jsx
<div
  style={{
    backgroundColor: 'black',
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
  }}
>
  <Logo inverted product="container-registry" style={{ margin: 5 }} />
  <Logo inverted product="discovery" style={{ margin: 5 }} />
  <Logo inverted product="enterprise" style={{ margin: 5 }} />
  <Logo inverted product="insights" style={{ margin: 5 }} />
  <Logo inverted product="nebula" style={{ margin: 5 }} />
  <Logo inverted product="pipelines" style={{ margin: 5 }} />
  <Logo inverted product="remediate" style={{ margin: 5 }} />
  <Logo inverted product="relay" style={{ margin: 5 }} />
  <Logo inverted product="comply" style={{ margin: 5 }} />
  <Logo inverted product="My Product" style={{ margin: 5 }} />
</div>
```

### Bug

There are times when you might need to use only the graphical icon for a Puppet product.

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo type="bug" product="container-registry" style={{ margin: 5 }} />
  <Logo type="bug" product="discovery" style={{ margin: 5 }} />
  <Logo type="bug" product="enterprise" style={{ margin: 5 }} />
  <Logo type="bug" product="insights" style={{ margin: 5 }} />
  <Logo type="bug" product="pipelines" style={{ margin: 5 }} />
  <Logo type="bug" product="remediate" style={{ margin: 5 }} />
  <Logo type="bug" product="relay" style={{ margin: 5 }} />
  <Logo type="bug" product="comply" style={{ margin: 5 }} />
  <Logo type="bug" product="My Product" style={{ margin: 5 }} />
</div>
```

## Related

- [Icon](#/React%20Components/Icon)
