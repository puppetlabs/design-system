### Breadcrumb

The Breadcrumb component allows users to navigate upwards through the parent routes of the current nested route. It expects to render Breadcrumb.Section children.

Breadcrumb.Section components will render as Link components with all passed props preserved.

The last Breadcrumb.Section (the leaf route) will render as an unclickable Text component.

```
<Breadcrumb>
  <Breadcrumb.Section as={Link} to="/items">
    Items
  </Breadcrumb.Section>
  <Breadcrumb.Section as={Link} to={`/items/11/details`}>
    11
  </Breadcrumb.Section>
  <Breadcrumb.Section>
    details
  </Breadcrumb.Section>
</Breadcrumb>
```
