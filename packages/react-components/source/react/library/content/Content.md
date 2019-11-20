## Overview

The Content component allows you to place formatted text within your application.
This provides a reasonable default for text formatting in text-heavy pages, such as documentation, legal documents, and inline help.

_Styling is limited to elements available in markdown._

`Base styles:`

```jsx
const style = { color: '#5d6f7a' };
const highlight = element => <span style={style}>{element}</span>;

<Content>
  <p>{highlight('p')} has 16px bottom margin.</p>
  <ul>
    <li>{highlight('ul')} has 24px of space below it 0 left padding.</li>
    <li>{highlight('ul li')} uses yellow bullets.</li>
  </ul>
  <ol>
    <li>{highlight('ol')} has 24px of space below it 0 left padding.</li>
    <li>{highlight('ol li')} uses black numbers.</li>
  </ol>
  <p>{highlight('p + h#')} has 24px top margin (applied to h#).</p>
  <h1>{highlight('h1')} has 24px bottom margin.</h1>
  <h2>{highlight('h2')} has 24px bottom margin.</h2>
  <h3>{highlight('h3')} has 24px bottom margin.</h3>
  <h4>{highlight('h4')} has 8px bottom margin.</h4>
  <h5>{highlight('h5')} has 8px bottom margin.</h5>
  <h6>{highlight('h6')} has 8px bottom margin.</h6>
  <code>{highlight('`code`')} uses a monospace font</code>
</Content>;
```

## Related

- [Content writing](#/Foundations/ContentWriting) : guidance and examples for writing content
- [Typography](#/Foundations/Typography) : rules and definitions for typefaces and fonts
