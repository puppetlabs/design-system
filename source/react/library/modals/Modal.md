```jsx
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'main' }) }}
    >
      Open simple modal
    </Button>
  </ButtonGroup>

  { state.isOpen === 'main' &&
    <Modal
      title="I'm a happy modal!"
      onRequestClose={ () => { setState({ isOpen: null }) }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc. Donec ultricies leo ac urna elementum, ac egestas quam viverra. Suspendisse erat eros, tempus eget condimentum ut, consectetur sed risus. In pretium dignissim nulla sit amet rhoncus. Nam sodales sem sapien, ac pretium mauris congue vitae.
    </Modal>
  }

</div>
```
