The logo component provides easy access to marketing-approved logos in our applications. A full set of official product logos may be specified by strings, in both full and bug variations. Additionally, an arbitrary logo may be rendered with the default puppet bug and a custom product name. Other components in the react component library, most prominently, the [Sidebar](#sidebar) are designed to work out-of-the-box with this component.

**NOTE: Custom logos should be used internally only. All public facing products should be given official trademarked logos through marketing.**

### Standard

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo product="container-registry" style={{ margin: 5 }} />
  <Logo product="discovery" style={{ margin: 5 }} />
  <Logo product="enterprise" style={{ margin: 5 }} />
  <Logo product="insights" style={{ margin: 5 }} />
  <Logo product="pipelines" style={{ margin: 5 }} />
  <Logo product="remediate" style={{ margin: 5 }} />
  <Logo product="My Product" style={{ margin: 5 }} />
</div>
```

### Inverted

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
  <Logo inverted product="pipelines" style={{ margin: 5 }} />
  <Logo inverted product="remediate" style={{ margin: 5 }} />
  <Logo inverted product="My Product" style={{ margin: 5 }} />
</div>
```

### Bug

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo type="bug" product="container-registry" style={{ margin: 5 }} />
  <Logo type="bug" product="discovery" style={{ margin: 5 }} />
  <Logo type="bug" product="enterprise" style={{ margin: 5 }} />
  <Logo type="bug" product="insights" style={{ margin: 5 }} />
  <Logo type="bug" product="pipelines" style={{ margin: 5 }} />
  <Logo type="bug" product="remediate" style={{ margin: 5 }} />
  <Logo type="bug" product="My Product" style={{ margin: 5 }} />
</div>
```
