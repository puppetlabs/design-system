```
initialState = { isOpen: null };
<div>
  <ButtonGroup>
    <Button
      onClick={ () => { setState({ isOpen: 'top' }) }}
      label="Open top"
    />
    <Button
      onClick={ () => { setState({ isOpen: 'right' }) }}
      label="Open right"
    />
    <Button
      onClick={ () => { setState({ isOpen: 'bottom' }) }}
      label="Open bottom"
    />
    <Button
      onClick={ () => { setState({ isOpen: 'left' }) }}
      label="Open left"
    />
  </ButtonGroup>

  { state.isOpen &&
    <SlideIn
      position={ state.isOpen }
      title="SlideIn title"
    >
      I'm a happy slide in!
    </SlideIn>
  }
</div>
```
