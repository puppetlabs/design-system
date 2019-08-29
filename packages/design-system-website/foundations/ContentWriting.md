The written word is how we engage with the user. The importance of writing should not be overlooked and is equal in weight to design and development to providing a quality experience.

## Titles

Titles are used to label pages or content areas. Titles are also used for navigation, for example, in the PE sidebar.

- Use the same heading for both the navigation and the page.
- Use a single noun or noun phrase that describes the content of the page, for example, Events, Reports, or Unsigned Certificates.
- Use sentence case capitalization: Unsigned certificates, Hosts by operating system.

## Short descriptions

Short descriptions explain the purpose of a page or element. Short descriptions can provide context for users and instruct them on how best to use the software.

- Use imperative verbs to describe what the user can do with the page or element, for example, View your Puppet-managed nodes, create node groups, and apply classification data.
- Use complete sentences with appropriate capitalization and punctuation.
- Limit short descriptions to 1 or 2 sentences. If necessary, follow with a question mark icon, and put more information in a tooltip.

## Information strings

Information strings provide current data about a page (such as minutes since data refresh, or number of nodes under management), but are not interactive.

- Use i18n best practices when writing these strings so that they are easily translatable.
- Generally, separate figures from the body of the sentence with colons. For example, Data refreshed:13 minutes ago.
- Do not use closing punctuation, unless you are separating two info strings on a single line, as in **Status as of**: a few seconds ago **Show**: Events from last run.

## Example

The following sample pattern shows how to lay out type on a page. It provides reasonable defaults for long-form content on a page. Always consult with your technical writer from Tech Pubs to get help crafting effective UI content.

<!--
```jsx
<Content>
  <h2>Examples</h2>
  The following sample pattern shows how to lay out type on a page. It provides reasonable defaults for long-form content on a page.

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

  <p>
    Use direct, simple language; active, instructive voice; and helpful, cheerful but not patronizing or funny tone.
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
-->

## Related

- [Writing guidelines on Confluence](https://confluence.puppetlabs.com/display/Writing/Puppet+content+style+guide)
- [Typography](#/Foundations/Typography) : definitions and rules for our typefaces and fonts
- [Content](#/React%20Components/Content) : a component for placing content blocks within an interface
