```
const icons = require('./source/react/library/icons');

<div>
{
  Object.keys(icons).map(icon => (
    <div className="sg-icon">
      <div className="sg-icon-wrapper">
        <Icon type={ icon } />
      </div>
      <div className="sg-icon-title" title={ icon }>
        { icon }
      </div>
    </div>
  ))
}
</div>
```
