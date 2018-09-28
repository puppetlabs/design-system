The Link component encapsulates link styling but allows rendering of custom html element

```
<Link href="https://www.google.com" style={{ margin: 10 }}>I am an anchor tag</Link>
<Link as="button" onClick={console.log} style={{ margin: 10 }}>I am a button</Link>
<Link as={props => <span {...props} />} to="/test">I am a custom component (think react router)</Link>
```
