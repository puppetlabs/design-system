```
const icons = require('./icons').default;
const Renderer = () => {
  const names = Object.keys(icons);
  const components = [];

  for (var i = 0; i < names.length; i++) {
    components.push(
      <div><Icon type={ names[i] } height="12px" /> { names[i] }</div>
    );
  }

  return (
    <div className="rc-sg-wrapper">{ components }</div>
  );
};
<Renderer />
```
