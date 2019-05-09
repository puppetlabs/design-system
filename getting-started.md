# Getting started

This is a guided walkthrough of `uikit` with examples of using React components, Sass variables, and other packages.

## Create a web app

If you don't have a recent version of Node.js installed locally, install the latest LTS, e.g. `brew install node@10`.

Install `uikit`:

```sh
npm install -g @puppet/uikit --registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm/
```

Generate a web app:

```sh
uikit generate project hello-world
```

Open [http://localhost:3000](http://localhost:3000).

## Add a new page

Add a new page with a corresponding route, view, and sidebar link:

```sh
uikit generate page MyPage
```

Style the new page by opening `src/client/routes/MyPage/MyPage.scss` and adding the following Sass. Note the reference to [sass-variables](https://github.com/puppetlabs/design-system/tree/master/packages/sass-variables).

```scss
@import '~@puppet/sass-variables/index';

.route-my-page {
  .rc-heading {
    color: $puppet-amber;
  }
}
```

Add a link from the homepage to the new page:

```jsx
import { Link } from 'react-router-dom';
import { Button } from '@puppet/react-components';

 <Button as={Link} to="/my-page">My Page</Button>
```

## Add a table

Add a table to `src/client/routes/MyPage/MyPage.jsx`:

```jsx
import { Table } from '@puppet/react-components';

const data = [
  { id: 1, name: 'Nathan Ward', team: 'Design System', location: 'Overlook' },
  { id: 2, name: 'Mik', team: 'Infracore', location: 'Overlook' },
  { id: 3, name: 'Erik', team: 'Erik', location: 'Overlook' },
  { id: 4, name: 'Eric Putnam', team: 'CD4PE', location: 'Overlook' },
  { id: 5, name: 'TP Honey', team: 'ecosystem', location: 'BlueJeans' },
  { id: 6, name: 'Maggie Dreyer', team: 'Server', location: 'Overlook' },
  { id: 7, name: 'Josh Cooper', team: 'Coremunity', location: 'Overlook' },
];
const columns = [
  { label: 'Presenter', dataKey: 'name' },
  { label: 'Team', dataKey: 'team' },
  { label: 'Location', dataKey: 'location' },
];

<Table data={data} columns={columns} />
);

export default MyPage;
```

## Add remote data to a table

Add a `fetch` request in a `useEffect` hook and store the data with a `useState` hook in `src/client/routes/MyPage/MyPage.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { Table } from '@puppet/react-components';
import PageTitle from 'components/PageTitle';
import './MyPage.scss';

const columns = [
  { label: 'Repository', dataKey: 'full_name' },
  { label: 'Stars', dataKey: 'stargazers_count' },
];

const MyPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=puppet+language:puppet+sort:stars',
      );
      const json = await response.json();
      setData(json.items);
    };
    fetchData();
  }, []);

  return (
    <div className="route-my-page">
      <PageTitle title="My Page" />
      <Table data={data} columns={columns} />
    </div>
  );
};

export default MyPage;
```
