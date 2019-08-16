## Overview
The Content component allows you to place formatted text within your application.
This provides a reasonable default for text formatting in text-heavy pages, such as documentation, legal documents, and inline help.

_Styling is limited to elements available in markdown._

If we move to support all html elements, the following should also be implemented:

1. `header + description` spacing
1. `caption` color and spacing
1. `label` color and spacing

`Base styles:`

```jsx
const style = { color: '#5d6f7a' };
const highlight = element => <span style={style}>{element}</span>;

<Content>
  <p>{highlight('p')} has 16px bottom margin.</p>
  <ul>
    <li>{highlight('ul')} has 24px bottom margin and 0 left padding.</li>
    <li>{highlight('ul li')} has 8px bottom margin and a yellow bullet.</li>
    <li>{highlight('last ul li')} has 0 bottom margin.</li>
  </ul>
  <ol>
    <li>{highlight('ol')} has 24px bottom margin and 0 left padding.</li>
    <li>{highlight('ol li')} has 8px bottom margin and a yellow number.</li>
    <li>{highlight('last ol li')} has 0 bottom margin.</li>
  </ol>
  <p>{highlight('p + h#')} has 24px top margin (applied to h#).</p>
  <h1>{highlight('h1')} has 24px bottom margin.</h1>
  <h2>{highlight('h2')} has 24px bottom margin.</h2>
  <h3>{highlight('h3')} has 24px bottom margin.</h3>
  <h4>{highlight('h4')} has 8px bottom margin.</h4>
  <h5>{highlight('h5')} has 8px bottom margin.</h5>
  <h6>{highlight('h6')} has 8px bottom margin.</h6>
</Content>;
```

## Related
* [Content writing](#/Foundations/ContentWriting) - Guidance and examples for writing content.
* [Typography](#/Foundations/Typography) - Rules and definitions for typefaces and fonts.
