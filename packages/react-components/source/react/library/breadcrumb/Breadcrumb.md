## Overview

The Breadcrumb component allows users to navigate upwards through the parent routes of the current nested route. It expects to render Breadcrumb.Section children.

Breadcrumbs give the user a sense of place, and an understanding of both where they are and the path they took to get there. If they were deep-linked to the page, the breadcrumb helps them understand the context of what’s on the page, and how they might return there later.

Place breadcrumbs at the top of the page. Don’t link the name of the current page.

## Basic Use

Breadcrumb.Section components will render as Link components with all passed props preserved. The last Breadcrumb.Section (the leaf route) will render as an unclickable Text component.

In the example below, the first Breadcrumb.Section is configured to use react router, while the second produces a conventional <a> tag.

```jsx
import Link from '../link';

<Breadcrumb>
  <Breadcrumb.Section as={Link} to="/items">
    Items
  </Breadcrumb.Section>
  <Breadcrumb.Section href="https://www.puppet.com/items/11" target="_blank">
    11
  </Breadcrumb.Section>
  <Breadcrumb.Section>Details</Breadcrumb.Section>
</Breadcrumb>;
```

## Related

- [Link](#/React%20Components/Link)
- [Text](#/React%20Components/Text)
