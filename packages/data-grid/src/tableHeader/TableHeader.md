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
  searchable
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

### Searchable

Search functionality is used to quickly remove rows of the table which are not relevant to you. It is noting that the current implementation is only to be used to filter one table columns data and should not be used as a broad table search. For this reason you should add a placeholder in the search box explaining which column you are searching through.

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
    label: 'Event',
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
    this.state = { renderedData: data, searchValue: '' };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.updateDataSearch = this.updateDataSearch.bind(this);
  }

  onSearchChange(value) {
    this.setState({ searchValue: value }, () => this.updateDataSearch(value));
  }

  updateDataSearch(value) {
    const newData = data.filter(element => element.eventType.includes(value));
    this.setState({ renderedData: newData });
  }

  render() {
    const { renderedData, searchValue } = this.state;
    return (
      <div>
        <Table.TableHeader
          search
          searchPlaceholder="Search by event"
          searchValue={searchValue}
          onSearchChange={this.onSearchChange}
          rowCountText={`${renderedData.length} events`}
        />
        <Table data={renderedData} columns={columns} />
      </div>
    );
  }
}
<StatefulParent />;
```

### Search and Filter

Should you wish to add search and filtering together this is the recommended approach. It is important to note that your logic for filtering and searching should be 'And' logic. Do not implement 'Or' logic for search and filtering together!

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
    label: 'Event',
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
    this.state = { renderedData: data, selectedfilters: [], searchValue: '' };
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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
    const { selectedfilters, searchValue } = this.state;
    let newData = [];

    if (searchValue != '') {
      newData = data.filter(element => element.eventType.includes(searchValue));
    } else {
      newData = data;
    }

    // Update table data
    let filteredData = newData;

    if (selectedfilters.length > 0) {
      selectedfilters.forEach(aFilter => {
        const { field: filterField } = aFilter;
        filteredData = filteredData.filter(
          row => row[filterField] === aFilter.value,
        );
      });
      this.setState({ renderedData: filteredData });
    } else {
      this.setState({ renderedData: newData });
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

  onSearchChange(value) {
    this.setState({ searchValue: value }, () => this.updateData());
  }

  render() {
    const { renderedData, selectedfilters, searchValue } = this.state;
    return (
      <div>
        <Table.TableHeader
          search
          searchPlaceholder="Search by event"
          searchValue={searchValue}
          onSearchChange={this.onSearchChange}
          filters={filters}
          onFilterChange={this.onFilterSelect}
          activeFilters={selectedfilters}
          onRemoveAll={this.onRemoveAll}
          onRemoveTag={this.onRemoveTag}
          rowCountText={`${renderedData.length} events`}
        />
        <Table data={renderedData} columns={columns} />
      </div>
    );
  }
}
<StatefulParent />;
```

### Table Actions

Table actions are a list of actionable commands with are applied to the selected rows within a table. It is expected that table actions only work with selectable tables.

```jsx
const onActionClick = filters => {

  console.log('An action was selected', filters);
};

const actions = [
      {
        value: 'delete',
        icon: 'trash',
        label: 'Delete All',
      },
      {
        value: 'send',
        icon: 'rocket',
        label: 'Send',
      },
      {
        value: 'refresh',
        label: 'Refresh',
        icon: 'refresh',
      },
    ];

<TableHeader
  actions={actions}
  onActionSelect={onActionClick}
/>;
```

### Table Action Buttons

Table action buttons are buttons that will trigger an action on the dataset. An example of a dataset action is `export`

```jsx
  class TableHeaderActionButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        exportLoading: false,
        scanLoading: false,
      }
    }

    onActionButtonClick(button) {
      this.setState({ [`${button}Loading`]: true});
      console.log(`Action ${button} was triggered` );
      setTimeout(()=>{
        console.log(`Action ${button} finished`)
        this.setState({ [`${button}Loading`]: false});
      }, 2000);
    }

    render() {
      const { exportLoading, scanLoading } = this.state;
      return (
        <TableHeader
          actionButtons={[{
            label: 'export',
            onClick: () => this.onActionButtonClick('export'),
            loading: exportLoading,
            icon: 'export',
          },{
            label: 'scan',
            type: 'transparent',
            onClick: () => this.onActionButtonClick('scan'),
            loading: scanLoading,
            icon: 'scan',
          },
          ]}
        />
      );
    }
  }

<TableHeaderActionButton />;
```
