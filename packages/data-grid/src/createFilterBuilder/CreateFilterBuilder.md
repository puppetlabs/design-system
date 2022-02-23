### Create Filter Builder

```jsx
  const fieldOptions = [
    { value: 'field1', label: 'TableColumn 1' },
    { value: 'field2', label: 'TableColumn 2' },
    { value: 'field3', label: 'TableColumn 3' },
  ];
  const operatorOptions = [ { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    ];

    const onSubmit = (values) => {
        console.log('submitted :', values)
    };

  <CreateFilterBuilder  
      fieldOptions={fieldOptions}
      operatorOptions={operatorOptions}
      onSubmit={onSubmit}
  />

```
