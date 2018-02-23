```
const CustomComponent = function(props) {
  return <span>Noah Sucks</span>
};

const data = [{ name: 'Noah' }];
const columns = [{
  column: 'name',
  displayName: 'Name'
}, {
  column: '',
  displayName: 'Actions',
  component: CustomComponent,
}];

<Table data={ data } columns={ columns } />
```