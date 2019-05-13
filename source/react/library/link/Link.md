The Link component encapsulates link styling but allows rendering of custom html elements.

```
const linkStyle = { marginRight: 10 };

<div>
  <Link href="https://www.google.com" target="_blank" style={linkStyle}>Link</Link>
  <Link href="https://www.google.com" target="_blank" size="small" style={linkStyle}>Small link</Link>
  <Link as="button" onClick={() => console.log('hi')} style={linkStyle}>Link as button element</Link>
</div>
```
