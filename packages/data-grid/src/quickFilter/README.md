### Quick Filter

The quick filter is a component that accepts an outer array `filters` of objects that include the quick filters label "fieldLabel", the text displayed to the user and a unique key "field" (this should match the datakey of the column being filtered) with an inner `options` array of objects, the possible selections a user can pick from under a certain field. This includes the "value" returned after a users selection for a dataset to be filtered by, an "icon" to add to a specific row (optional) and the "label" text which will be displayed for each option. The `onFilterSelect` is a function that is called when a user clicks an option to filter by. 

```jsx
const onFilterSelect = (filter,filterLabel, value) =>{
    console.log('A filter was picked', filter, filterLabel, value)
}

const filters = [
  {
    fieldLabel: 'All Operating System',
    field: 'All-Operating-System',
    options: [
      {
        value: 'linux',
        icon: 'pencil',
        label: 'linux',
      },
      {
        value: 'Windows',
        icon: 'send',
        label: 'Windows',
      },
      {
        value: 'MacOS',
        label: 'MacOS',
        icon: 'link',
      },
    ],
  },
  {
    fieldLabel: 'Puppet installed',
    field: 'Puppet-installed',
    options: [
      {
        value: 'True',
        icon: 'pencil',
        label: 'True',
      },
      {
        value: 'False',
        icon: 'send',
        label: 'False',
      },
      {
        value: 'Unknown',
        label: 'Unknown',
        icon: 'link',
      },
    ],
  },
];

<QuickFilter
filters={filters}
onFilterSelect={onFilterSelect}
/>
```

### Empty State

Where there is no items to filter by, resulting in an empty array for the filters options, the quick filter will be displayed in its empty state. This is defined by `emptyFilterOption` with an `emptyFilterLabel` message displayed to the user which can be customized. This is not clickable and by default this message is "No items to filter by".

```jsx
const filters = [
  {
    fieldLabel: 'Empty filter',
    field: 'Empty-array',
    options: [],
  },
];

const emptyFilterLabel = 'No items to filter by';

  const emptyFilterOption = [
    {
      label: emptyFilterLabel,
      disabled: true,
      value: '',
    },
  ];

   <QuickFilter
    filters={filters}
    emptyFilterLabel={emptyFilterLabel}
  />;
  ```
