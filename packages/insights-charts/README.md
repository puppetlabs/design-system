# Reflect Charts

Reflect Charts is Reflect's JavaScript library for building highly customizable and interactive
charts. Reflect Charts provides high level chart types such as Lines, Areas, and Bars, combined
with lower level building blocks.

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
    position: 'right', // can be top, right, bottom, or left
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
