```
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'main' }) }}
      label="Open simple modal"
    />
    <Button
      onClick={ () => { setState({ isOpen: 'actions' }) }}
      label="Open modal with actions"
    />
  </ButtonGroup>

  { state.isOpen === 'main' &&
    <Modal
      onClose={ () => { setState({ isOpen: null }) }}
    >
      <h1>I'm a happy modal!</h1>
      <span>I'm some happy content within the modal!</span>
    </Modal>
  }

  { state.isOpen === 'actions' &&
    <Modal
      actionsCTA="Select an action"
      actions={ [
        <Button label="Click me!" onClick={ () => { setState({ isOpen: null }) } } />,
        <Button secondary label="Or me!" onClick={ () => { setState({ isOpen: null }) } } />
      ]}
      onClose={ () => { setState({ isOpen: null }) }}
    >
      <h1>I'm a happy modal with actions!</h1>
      <span>I'm some happy content within the modal!</span>
    </Modal>
  }

</div>
```

Modals can have sidebars:
```
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'leftSidebar' }) }}
      label="Open modal with left sidebar"
    />
    <Button
      onClick={ () => { setState({ isOpen: 'rightSidebar' }) }}
      label="Open modal with right sidebar"
    />
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
