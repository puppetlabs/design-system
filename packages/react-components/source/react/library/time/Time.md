## Overview

The time component is a `Intl.DateTimeFormat` wrapper to enable consistent language-sensitive date and time formatting across our products.

### Default date format

```jsx
<Time>{Date.now()}</Time>
```

### Formated date example

```jsx
<Time
  year="numeric"
  month="long"
  day="numeric"
  hour="numeric"
  minute="numeric"
  second="numeric"
>
  {`2020-05-01T15:37:45.1429698Z`}
</Time>
```
