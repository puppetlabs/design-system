```
<Accordion title="I'm a fun Accordion">
  <AccordionItem key="elem1" title="First element">
    <div>Hello, world! From the first element.</div>
  </AccordionItem>
  <AccordionItem key="elem2" title="Second element">
    <div>Hello, world! From the second element.</div>
  </AccordionItem>
  <AccordionItem key="elem3" title="Third element">
    <div>Hello, world! From the third element.</div>
  </AccordionItem>
</Accordion>
```

`Accordion` with `autoOpen`, rendering a `Table`:

```
const exampleTableData = [{
  text: 'Happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 1 },
  order: 1,
}, {
  text: 'More happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 2 },
  order: 2,
}, {
  text: 'Even more happy striped table text',
  select: 'Happy Select',
  input: 'We are happy striped inputs',
  meta: { selected: true, column: '', id: 3 },
  order: 3,
}];

const exampleTableColumns = [{
  column: 'text',
  displayName: 'text',
  order: 1,
}, {
  column: 'select',
  displayName: 'Select',
  order: 2,
  component: ColumnSelect,
  options: [
    { value: 'metric', label: 'Metric' },
    { value: 'dimension', label: 'Dimension' },
  ],
}, {
  column: 'input',
  displayName: 'Input',
  order: 2,
  component: ColumnInput,
}];
<Accordion autoOpen>
  <AccordionItem key="elem1" title="With a Button">
    <Button label="My Button" />
  </AccordionItem>
  <AccordionItem key="elem2" title="With a Table">
     <Table
       className="rc-table-fixed rc-table-striped"
       selectable
       striped
       data={ exampleTableData }
       columns={ exampleTableColumns }
     />
  </AccordionItem>
</Accordion>
```
