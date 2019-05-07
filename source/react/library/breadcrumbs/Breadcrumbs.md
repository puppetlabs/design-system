Breadcrumbs with full path:

```
const root = 'https://puppet.com/home';
const routes = ['workflows', '11', 'runs', '13'];

<Breadcrumbs root={root} routes={routes} />
```

Breadcrumbs with root path alias:

```
const root = { alias: 'Home', path: '/home' };
const routes = ['workflows', '11', 'runs', '13'];

<Breadcrumbs root={root} routes={routes} />
```

Breadcrumbs without routes (to demonstrate current route is always unclickable):

```
const root = { alias: 'Home', path: '/home' };

<Breadcrumbs root={root} />
```
