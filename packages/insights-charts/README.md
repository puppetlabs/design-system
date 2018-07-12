# Insights Charts

Insights Charts is a collection of data visualizations and their associated styles. 
These charts are primairly used by the Puppet Insights team, but are designed to be consumed by
other teams and products.

We welcome contributions and have put together a process for contributing.
Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## Installation

Insights Charts is distributed on [Artifactory](https://confluence.puppetlabs.com/display/SRE/Artifactory+Basics).

You can install Insights Charts with the following command:

`npm install @puppet/insights-charts`

If you run into issues while installing, please double check that you're either
on the corporate WiFI or VPN.

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## FAQ

Q: Which browser versions do we support?
A: Down to IE11.

## API (in development)

### Rendering a chart

```javascript
  const options = {
    grid: { enabled: true },
  };

  const data = {
    categories: ['Geoff', 'Colby'],
    series: [
      { label: 'Coolness', data: [2, 1] },
    ],
  };

  const rc = new ReflectChart(document.getElementById('my-div'), {
    type: 'line',
    options: options,
    data: data,
  });

  rc.render();
```

### Subscribing to events

```javascript
  // `rc` is an instance of a chart, as created above.

  rc.on('eventType', payload => {
    console.log('payload');
  });

  // or, pass events through the config object to the constructor or update method.

  const events = {
    'eventType': payload => console.log(payload),
  };

  rc.render({
    events: events,
  });
```

### Grid configuration

```javascript
options: {
  grid: {
    enabled: true,
    horizontal: true,
    vertical: true,
  },
}
```

### Legend configuration

```javascript
options: {
  legend: {
    enabled: true,
    orientation: 'right', // can be top, right, bottom, or left
  },
}
```

### Axis configuration

```javascript
options: {
  axis: {
    y: {
      enabled: true,
      max: 100,
      min: 0,
      orientation: 'left', // can be left or right
      ticks: 6,
      title: 'axis title',
    },
  },
}
```
