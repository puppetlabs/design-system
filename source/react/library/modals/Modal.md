A `Modal` is a container with arbitrary content that opens above other page content.

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'main' }) }}
  >
    Open simple modal
  </Button>

  { state.isOpen === 'main' &&
    <Modal onClose={ () => { setState({ isOpen: null }) }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc. Donec ultricies leo ac urna elementum, ac egestas quam viverra. Suspendisse erat eros, tempus eget condimentum ut, consectetur sed risus. In pretium dignissim nulla sit amet rhoncus. Nam sodales sem sapien, ac pretium mauris congue vitae.
    </Modal>
  }

</div>
```

The `Modal.Title` and `Modal.Actions` subcomponents should be used to

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'title' }) }}
  >
    Open modal with sub-components
  </Button>

  { state.isOpen === 'title' &&
    <Modal onClose={ () => { setState({ isOpen: null }) }}>
      <Modal.Title>Titular Content</Modal.Title>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ante non mauris tristique, id iaculis orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper fringilla congue. Donec sed risus id augue aliquet laoreet a tempus nunc. Donec ultricies leo ac urna elementum, ac egestas quam viverra. Suspendisse erat eros, tempus eget condimentum ut, consectetur sed risus. In pretium dignissim nulla sit amet rhoncus. Nam sodales sem sapien, ac pretium mauris congue vitae.
      <Modal.Actions>
        <Button>Engage!</Button>
        <Button type="secondary">Abort!</Button>
      </Modal.Actions>
    </Modal>
  }

</div>
```

A common pattern is to include a Form in a Modal. This may be accomplished by composing these components.

```jsx
initialState = { isOpen: null };
<div>
  <Button
    onClick={ () => { setState({ isOpen: 'wide' }) }}
  >
    Open wide modal
  </Button>

  { state.isOpen === 'wide' &&
    <Modal size="large" onClose={ () => { setState({ isOpen: null }) }}>
      <Modal.Title>Fill out this form!</Modal.Title>
      <Form submittable cancellable>
        <Form.Field
          type="email"
          name="email"
          label="Email"
        />
        <Form.Field
          type="text"
          name="favorite_animal"
          label="Favorite Animal"
        />
        <Form.Field
          type="checkbox"
          name="is_weirdo"
          label="Are you a weirdo?"
        />
      </Form>
    </Modal>
  }

</div>
```
