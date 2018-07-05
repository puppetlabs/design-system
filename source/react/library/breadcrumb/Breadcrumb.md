```js
const clickHandler = (text) => {
  console.log(`${text} clicked`)
};
<Breadcrumb>
  <Breadcrumb.Section link route="section-1" onClick={ clickHandler }>Section 1</Breadcrumb.Section>
  <Breadcrumb.Separator />
  <Breadcrumb.Section link route="section-2" onClick={ clickHandler }>Section 2</Breadcrumb.Section>
  <Breadcrumb.Separator />
  <Breadcrumb.Section>Section 3</Breadcrumb.Section>
</Breadcrumb>
```
