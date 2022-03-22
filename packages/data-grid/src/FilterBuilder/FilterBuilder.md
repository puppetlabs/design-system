### Filter Builder

```jsx
  const fieldOptions = [
    { value: 'field1', label: 'TableColumn 1' },
    { value: 'field2', label: 'TableColumn 2' },
    { value: 'field3', label: 'TableColumn 3' },
  ];
  const operatorOptions = [ 
    { value: 'equals', label: 'Equals' },
    { value: 'doesNotEquals', label: 'Does Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'doesNotContains', label: 'Does Not Contains' },
    ];

    const onSubmit = (values) => {
        console.log('submitted :', values)
    };

  <FilterBuilder  
      fieldOptions={fieldOptions}
      operatorOptions={operatorOptions}
      onSubmit={onSubmit}
  />

```
