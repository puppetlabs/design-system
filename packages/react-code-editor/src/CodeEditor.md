## Overview

`CodeEditor` is a styled wrapper around react-ace, i.e. Ace Editor and Brace, which provides a standalone code editor with syntax highlighting.

## Types

## Editable

```jsx
<CodeEditor
  name="UNIQUE_ID_OF_DIV_1"
  value={`animals:
  dog: true
  cat: false`}
  onChange={newValue => console.log('Editor contents:', newValue)}
  height={200}
/>
```

## Read-only and light mode

```jsx
<CodeEditor
  name="UNIQUE_ID_OF_DIV_2"
  readOnly
  darkMode={false}
  value={`animals:
  dog: true
  cat: false`}
  height={200}
/>
```
