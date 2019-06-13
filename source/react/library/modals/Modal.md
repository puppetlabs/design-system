```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'main' }) }}
  >
    Open simple modal
  </Button>

  { state.isOpen === 'main' &&
    <Modal onRequestClose={ () => { setState({ isOpen: null }) }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc.
    </Modal>
  }

</div>
```

A `Modal` may contain buttons.

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'buttons' }) }}
  >
    Open modal that contains a button
  </Button>

  { state.isOpen === 'buttons' &&
    <Modal
      actions={
        <Button primary onClick={() => setState({ isOpen: null })}>
          Submit
        </Button>
       }
      onRequestClose={ () => { setState({ isOpen: null }) }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Modal>
  }

</div>
```

A `Modal` may contain have a header.

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'title' }) }}
  >
    Open modal that contains a header
  </Button>

  { state.isOpen === 'title' &&
    <Modal
      title="Welcome to this modal dialog box"
      onRequestClose={ () => { setState({ isOpen: null }) }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Modal>
  }

</div>
```

A `Modal` may be very wide.

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'wide' }) }}
  >
    Open wide modal
  </Button>

  { state.isOpen === 'wide' &&
    <Modal size="large" onRequestClose={ () => { setState({ isOpen: null }) }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc. Donec ultricies leo ac urna elementum, ac egestas quam viverra. Suspendisse erat eros, tempus eget condimentum ut, consectetur sed risus. In pretium dignissim nulla sit amet rhoncus. Nam sodales sem sapien, ac pretium mauris congue vitae.
    </Modal>
  }

</div>
```
