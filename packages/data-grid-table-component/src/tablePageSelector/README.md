```jsx
const pageSelectFunc = newPage => {
  // sortFunc will return direction and dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and rerender the table
  console.log('newPage to be rendered ', newPage);
};

<TablePageSelector
      currentPage={8}
      pageCount={10}
      onClickHandler={pageSelectFunc}
      delta={1}
    />
```
### Page Navigation

```jsx
const pageSelectFunc = newPage => {
  // sortFunc will return direction and dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and rerender the table
  console.log('newPage to be rendered ', newPage);
};

  <TablePageSelector
    onClickHandler={pageSelectFunc}
  />
```