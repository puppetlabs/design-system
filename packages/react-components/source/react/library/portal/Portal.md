## Overview

Portals provide a quick and easy way to render elements at any given point in the DOM hierarchy. This can be useful when positioning tooltips, modals, nav menus, or other elements that need to be positioned higher in the DOM but controlled or triggered from a deeply nested component.

<div id="rc-portal-ex-overview"><div>
### Portal

```jsx
const { useState } = require('react');
import Portal from '../portal';
import Button from '../button';
import Content from '../content';
import Heading from '../heading';
import Link from '../link';
import Text from '../text';

const [portalLocation, setPortalLocation] = useState();
const [portalActive, setPortalActive] = useState(false);
const renderIn = target => {
  setPortalLocation(target);
  setPortalActive(!!target);
};

const location = {
  'ex-sibling': 'the sibling div',
  'ex-overview': 'the Overview section',
  'ex-parent': 'the parent',
};
<>
  <div id="rc-portal-ex-parent" style={{ color: 'blue' }}>
    <div
      id="rc-portal-ex-sibling"
      style={{
        color: 'MintCream',
        padding: '8px',
        backgroundColor: 'LightSlateGrey',
        marginBottom: '8px',
      }}
    >
      Sibling Element
    </div>
    <div style={{ color: 'red' }}>
      <Portal target={portalLocation} active={portalActive}>
        <h3>
          {portalLocation
            ? `I'm rendering in ${location[portalLocation]}!`
            : `I'm not rendering in a portal `}
        </h3>
      </Portal>
    </div>
  </div>
  <Button onClick={() => renderIn('ex-sibling')}>Render in sibling</Button>
  <Button onClick={() => renderIn('ex-overview')}>Render in Overview</Button>
  <Button onClick={() => renderIn('ex-parent')}>Render in parent</Button>
  <Button onClick={() => renderIn()}>Deactivate portal</Button>
</>;
```

## Variations

By default, if the target id was not found within the DOM, a div will be created and appended to the root node of the application. The target id, style, and className are then applied to the newly created div. If the target div already exists, the portal's children are appended to it.

```jsx
const { useState } = require('react');
import Button from '../button';
import Portal from '../portal';

const [showMenu, setShowMenu] = useState(false);
const [showMore, setShowMore] = useState(false);

const menuStyle = {
  backgroundColor: 'lightSlateGrey',
  borderRadius: '4px',
  color: 'mintCream',
  height: 'fit-content',
  width: '90%',
  position: 'absolute',
  top: '25px',
  left: '5%',
  zIndex: '100',
  textAlign: 'center',
};
<>
  <Button onClick={() => setShowMenu(!showMenu)}>
    {showMenu ? 'Close' : 'Render in'} menu
  </Button>
  <Portal active={showMenu} style={menuStyle} className="test">
    <h3>I'm some menu content</h3>
  </Portal>

  <Button onClick={() => setShowMore(!showMore)}>
    {showMenu && showMore ? 'Hide' : 'Show'} more content
  </Button>
  <Portal>{showMenu && showMore && <h3>I'm more content</h3>}</Portal>
</>;
```

## Related

- [TooltipHoverArea](#/React%20Components/TooltipHoverArea)
