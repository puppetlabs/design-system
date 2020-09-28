This is the Table Header

```jsx
const onFilterChange = filters => {
  console.log('The new array of filters is', filters);
};

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

<TableHeader
  rowCount={{ count: 555, label: 'Nodes' }}
  filters={filters}
  onFilterChange={onFilterChange}
/>;
```

### Table Quick Filtering

Quick filter functionality is used either to limit on what filters can be applied to a table or as a way of speeding up a users desision making and apply meaningful filters quickly.

```jsx
import Table from '../table/Table.jsx';
const data = [
  {
    eventType: 'Task',
    reportCompleted: true,
  },
  {
    eventType: 'Task',
    reportCompleted: false,
  },
  {
    eventType: 'Task',
    reportCompleted: true,
  },
  {
    eventType: 'Plan',
    reportCompleted: false,
  },
  {
    eventType: 'Plan',
    reportCompleted: true,
  },
];

const columns = [
  {
    label: 'Host',
    dataKey: 'eventType',
  },
  {
    label: 'Report Has Completed',
    dataKey: 'reportCompleted',
    cellRenderer: ({ cellData }) => {
      return cellData.toString();
    },
  },
];
const filters = [
  {
    fieldLabel: 'Event Type',
    field: 'eventType',
    options: [
      {
        value: 'Task',
        icon: 'build',
        label: 'Task',
      },
      {
        value: 'Plan',
        icon: 'clipboard',
        label: 'Plan',
      },
    ],
  },
  {
    fieldLabel: 'Report Completed',
    field: 'reportCompleted',
    options: [
      {
        value: true,
        icon: 'pencil',
        label: 'True',
      },
      {
        value: false,
        icon: 'send',
        label: 'False',
      },
    ],
  },
];

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = { renderedData: data, selectedfilters: [] };
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
  }

  onFilterSelect(filter, label, value) {
    const newTag = { fieldLabel: label, value, field: filter };
    const { selectedfilters } = this.state;

    // if filter field already exists get me the id and change it
    if (selectedfilters.some(e => e.field === filter)) {
      const effectedIndex = selectedfilters.findIndex(x => x.field === filter);

      const newArray = selectedfilters;

      newArray.splice(effectedIndex, 1, newTag);

      this.setState(
        {
          selectedfilters: newArray,
        },
        () => this.updateData(),
      );
    } else {
      this.setState(
        {
          selectedfilters: [...selectedfilters, newTag],
        },
        () => this.updateData(),
      );
    }
  }

  updateData() {
    const { selectedfilters } = this.state;

    // Update table data
    let filteredData = data;

    if (selectedfilters.length > 0) {
      selectedfilters.forEach(aFilter => {
        const { field: filterField } = aFilter;
        filteredData = filteredData.filter(
          row => row[filterField] === aFilter.value,
        );
      });
      this.setState({ renderedData: filteredData });
    } else {
      this.setState({ renderedData: data });
    }
  }

  onRemoveAll() {
    this.setState({ selectedfilters: [] }, () => this.updateData());
  }

  onRemoveTag(tag) {
    const { selectedfilters } = this.state;
    const newArray = selectedfilters;

    const findWithAttr = (array, attr, value) => {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    };

    const effectedIndex = findWithAttr(newArray, 'field', tag);
    newArray.splice(effectedIndex);

    this.setState(
      {
        selectedfilters: newArray,
      },
      () => this.updateData(),
    );
  }

  render() {
    const { renderedData, selectedfilters } = this.state;
    return (
      <div>
        <Table.TableHeader
          filters={filters}
          onFilterChange={this.onFilterSelect}
          activeFilters={selectedfilters}
          onRemoveAll={this.onRemoveAll}
          onRemoveTag={this.onRemoveTag}
        />
        <Table data={renderedData} columns={columns} />
      </div>
    );
  }
}
<StatefulParent />;
```
