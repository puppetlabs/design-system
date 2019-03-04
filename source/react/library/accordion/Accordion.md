```
const numParagraphs = 20;
const paragraphs = [];

for (var i = 0; i < numParagraphs; i++) {
  paragraphs.push(<p>Hello world</p>);
}

<div style={ { height: '400px' } }>
  <Accordion title="I'm a fun Accordion" autoOpen>
    <Accordion.Item key="elem1" title="First element">
      <div>Hello, world! From the first element.</div>
    </Accordion.Item>
    <Accordion.Item key="elem2" title="Second element">
      <div>Hello, world! From the second element. Here's a bunch of paragraphs.</div>
      { paragraphs }
    </Accordion.Item>
    <Accordion.Item key="elem3" title="Third element">
      <div>Hello, world! From the third element.</div>
    </Accordion.Item>
  </Accordion>
</div>
```

`Accordion` with Icons:

```
<Accordion title="Accordion Title with Icon" icon="donut">
  <Accordion.Item title="First Accordion Item" icon="donut" tooltip="Bar is a component type" />
  <Accordion.Item title="Second Accordion Item" icon="donut" />
</Accordion>
```

`Accordion` with `autoOpen`, rendering a `Table`:

```
const ColumnSelect = require('../table/ColumnSelect.js').default;
const ColumnInput = require('../table/ColumnInput.js').default;

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
<div style={ { height: '400px' } } >
  <Accordion title='This accordion has autoOpen on' autoOpen>
    <Accordion.Item key="elem1" title="With a Button">
      <Button>My Button</Button>
    </Accordion.Item>
    <Accordion.Item key="elem2" title="With a Table">
       <Table
         className="rc-table-fixed rc-table-striped"
         selectable
         striped
         data={ exampleTableData }
         columns={ exampleTableColumns }
       />
    </Accordion.Item>
  </Accordion>
</div>
```
