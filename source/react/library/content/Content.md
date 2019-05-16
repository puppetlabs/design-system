`Content` applies base element styling and spacing to paragraph-style flow.

```
const style = {color: '#ffae1a'};
const highlight = element => <span style={style}>{element}</span>;

<Content>
  <p>{highlight('p')} has 16px bottom margin.</p>
  <ul>
    <li>{highlight('ul')} & {highlight('ol')} have 24px bottom margin.</li>
    <li>{highlight('li')} has 8px bottom margin.</li>
    <li>{highlight('last li')} has 0px bottom margin.</li>
  </ul>
  <p>{highlight('p + h#')} has 24px top margin (applied to h#).</p>
  <h1>{highlight('h1')} has 24px bottom margin.</h1>
  <h2>{highlight('h2')} has 24px bottom margin.</h2>
  <h3>{highlight('h3')} has 24px bottom margin.</h3>
  <h4>{highlight('h4')} has 8px bottom margin.</h4>
  <h5>{highlight('h5')} has 8px bottom margin.</h5>
  <h6>{highlight('h6')} has 8px bottom margin.</h6>
  <label>{highlight('label')} has 0 margin & is medium colored.</label>
</Content>
```
