# Getting started

This is a guided walkthrough of `uikit` with examples of using React components, Sass variables, and other packages as well as how to create your own package.

## Create a web app

If you don't have a recent version of Node.js installed locally, install the latest LTS, e.g. `brew install node@10`.

Install `uikit`:

```sh
npm install -g @puppet/uikit
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
```

## Add remote data to a table

Add a `fetch` request in a `useEffect` hook and store the data with a `useState` hook. Your `src/client/routes/MyPage/MyPage.jsx` file should look like this:

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

## Create and publish your own npm package

Create a new library with the following command (outside of the directories used above):

```sh
uikit generate library world && cd world && npm install
```

Make a change to `src/World.jsx`:

```jsx
import React from 'react';

const World = () => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/The_Earth_seen_from_Apollo_17_with_transparent_background.png/603px-The_Earth_seen_from_Apollo_17_with_transparent_background.png" />
);

export default World;
```

Publish the package to our internal npm registry on Artifactory:

```sh
npm login --registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm/  # Use your PuppetPass
npm publish
```

Go back to the `hello-world` app and install the newly published `@puppet/world` package:

```sh
npm install @puppet/world
```

Generate a new page on which to show the `World` component:

```sh
uikit generate page Hello
```

Add the `World` component to `src/client/routes/Hello/Hello.jsx`:

```jsx
<World />
```
