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

## Back

The ‘back’ breadcrumb is a simplified version of the breadcrumb that aids way-finding by showing the user the name of the page they came from and allowing them to navigate back to it quickly. It is best used as an alternative to the ‘standard’ breadcrumb when the standard breadcrumb might provide confusion as to the user’s place in the application. This component should be used sparingly and you should show the name of the screen the user is navigating to where possible. Only one type of breadcrumb should be used in an application.

```jsx
import Link from '../link';

<Breadcrumb type='back' backLabel="Back to home"/>
```

## Related

- [Link](#/React%20Components/Link)
- [Text](#/React%20Components/Text)
