The TablePageSelector component has been developed for used alongside the DataGrid component. Primarily for implementations that require pagination.

### Pagination Navigation

```jsx
<TablePageSelector currentPage={1} pageCount={4} delta={1} />
```

```jsx
<TablePageSelector currentPage={2} pageCount={7} delta={1} />
```

```jsx
<TablePageSelector currentPage={3} pageCount={7} delta={1} />
```

```jsx
<TablePageSelector currentPage={4} pageCount={20} delta={1} />
```

```jsx
<TablePageSelector currentPage={5} pageCount={7} delta={1} />
```

```jsx
<TablePageSelector currentPage={6} pageCount={7} delta={1} />
```

```jsx
<TablePageSelector currentPage={7} pageCount={7} delta={1} />
```

### Page Navigation

When the number of pages is unknown then a Page navigation implementation can be used

```jsx
const pageSelectFunc = newPage => {
  // sortFunc will return dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and re-render the table
  console.log('newPage to be rendered ', newPage);
};

<TablePageSelector onClickHandler={pageSelectFunc} />;
```
