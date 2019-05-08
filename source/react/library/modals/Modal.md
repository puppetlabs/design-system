```jsx
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'main' }) }}
    >
      Open simple modal
    </Button>
    <Button
      onClick={ () => { setState({ isOpen: 'actions' }) }}
    >
      Open modal with actions
    </Button>
  </ButtonGroup>

  { state.isOpen === 'main' &&
    <Modal
      title="I'm a happy modal!"
      onClose={ () => { setState({ isOpen: null }) }}
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc. Donec ultricies leo ac urna elementum, ac egestas quam viverra. Suspendisse erat eros, tempus eget condimentum ut, consectetur sed risus. In pretium dignissim nulla sit amet rhoncus. Nam sodales sem sapien, ac pretium mauris congue vitae.</p>
    </Modal>
  }

  { state.isOpen === 'actions' &&
    <Modal
      title="I'm a happy modal with actions!"
      actionsCTA="Select an action"
      actions={ [
        <Button key="button-1" onClick={ () => { setState({ isOpen: null }) } } >Click me!</Button>,
        <Button key="button-2" onClick={ () => { setState({ isOpen: null }) } } >Or me!</Button>
      ]}
      onClose={ () => { setState({ isOpen: null }) }}
    >
      <span>I'm some happy content within the modal!</span>
    </Modal>
  }

</div>
```

Modals can have sidebars:

```jsx
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'leftSidebar' }) }}
    >
      Open modal with left sidebar
    </Button>
    <Button
      onClick={ () => { setState({ isOpen: 'rightSidebar' }) }}
    >
      Open modal with right sidebar
    </Button>
  </ButtonGroup>

  { state.isOpen === 'leftSidebar' &&
    <Modal
      title="I am a happy modal"
      sidebar="Happy Sidebar!"
      sidebarPosition="left"
      onClose={ () => { setState({ isOpen: null }) } }
      margin={ 200 }
      actionsCTA="I'm a happy action cta!"
    >
      Happy Content!
    </Modal>
  }

  { state.isOpen === 'rightSidebar' &&
    <Modal
      title="I am a happy modal"
      sidebar="Happy Sidebar!"
      sidebarPosition="right"
      onClose={ () => { setState({ isOpen: null }) } }
      margin={ 200 }
      actionsCTA="I'm a happy action cta!"
    >
      Happy Content!
    </Modal>
  }
</div>
```
