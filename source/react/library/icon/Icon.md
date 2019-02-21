**To render an icon, either:**

* Provide a type and a size (size optional)
* Provide an svg and a viewBox

**The specific svg rendered is decided by the following:**

1. If there is a unique svg for the type and size provided, we render it. Unique svgs are indicated by colored backgrounds below.
2. Otherwise, we scale down the next largest svg, or if unavailable, scale up the next smallest svg

*This creates a cascading effect from large to tiny, that reverses if necessary*


```
const icons = require('./icons').default;
const Renderer = () => {
  const names = Object.keys(icons);
  const components = [];

  for (var i = 0; i < names.length; i++) {
    // Unique icon variants have colored bg
    const variants = Object.keys(icons[names[i]] || {});
    const isUnique = size => variants.includes(size);

    components.push(
      <tr>
        <td key={ names[i] }>
          { names[i] }
        </td>

        <td className={isUnique('tiny') ? "rc-icon-unique-variant" : ""} key={ names[i] + `-tiny` }>
          <Icon type={ names[i] } size="tiny"/>
        </td>

        <td className={isUnique('small') ? "rc-icon-unique-variant" : ""} key={ names[i] + `-small` }>
          <Icon type={ names[i] } size="small"/>
        </td>

        <td className={isUnique('medium') ? "rc-icon-unique-variant" : ""} key={ names[i] + `-medium` }>
          <Icon type={ names[i] } size="medium"/>
        </td>

        <td className={isUnique('large') ? "rc-icon-unique-variant" : ""} key={ names[i] + `-large` }>
          <Icon type={ names[i] } size="large"/>
        </td>

      </tr>
    );
  }

  return (
    <div className="rc-sg-wrapper">
      <table className="rc-icon-table">
        <tr>
          <th>Name</th>
          <th>Tiny</th>
          <th>Small</th>
          <th>Medium (default)</th>
          <th>Large</th>
        </tr>
        { components }
      </table>
    </div>
  );
};
<Renderer />
```
