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

`An example:`

```jsx
<Content>
  <h2>Examples</h2>

  <h3>Divide into sections</h3>

  <p>
    Write as if we are thinking, speaking, human beings. Trust that there is
    another human out there, on the other side of the screen, using our
    products. They are desperately eager to understand what we want to tell
    them. Let us make that as clear as possible.
  </p>

  <p>
    It is helpful if we emphasize terminology so it is easier to distinguish
    from other forms of content. For example, a set of <em>tasks</em> can be
    combined into a <em>plan</em> when using <a>Bolt</a>.
  </p>

  <h4>Line length</h4>

  <p>
    The number of characters per line influences readability. In English, the
    following guidelines are considered the easiest to understand.
  </p>

  <h5>Desktop</h5>

  <ul>
    <li>
      <strong>45 to 75 characters</strong> is regarded as the most satisfactory
      line length.
    </li>
    <li>
      <strong>66 characters</strong> is considered an <strong>optimal</strong>{' '}
      line length though longer is ok.
    </li>
    <li>
      <strong>90 characters</strong> is considered <strong>too long</strong> and
      makes it difficult to traverse text from line to line.
    </li>
  </ul>

  <p>
    According to Elements of Typographical Style, anything from 45 to 75
    characters is widely-regarded as a satisfactory length of line for a
    single-column page set in a serifed text face in a text size. The
    66-character line (counting both letters and spaces) is widely regarded as
    ideal.
  </p>

  <p>
    Recent research suggest that this old wisdom is no longer valid. In some
    studies, user's have signaled that 90 characters is preferred, thus our 90
    character maximum.
  </p>
</Content>
```
