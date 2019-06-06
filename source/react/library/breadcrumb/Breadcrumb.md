### Breadcrumb

The Breadcrumb component allows users to navigate upwards through the parent routes of the current nested route. Parent routes are clickable links while the current route is non-clickable.

```
<Breadcrumb>
  <Breadcrumb.Section>
    <Link as={Link} to="/items">
      Items
    </Link>
  </Breadcrumb.Section>
  <Breadcrumb.Section>
    <Link
      as={Link}
      to={`/items/11/details`}
    >
      11
    </Link>
  </Breadcrumb.Section>
  <Breadcrumb.Section>
    details
  </Breadcrumb.Section>
</Breadcrumb>
```
