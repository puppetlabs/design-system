```
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

      <p>Aenean vehicula imperdiet quam, sit amet fringilla ligula. Nam orci arcu, ultricies nec feugiat vel, dignissim sit amet tellus. Nulla ut lobortis urna. Aenean augue ante, vehicula in fermentum sit amet, rhoncus sed ipsum. Donec aliquam velit a nunc mattis interdum. Proin congue urna non efficitur aliquam. Proin molestie condimentum accumsan. Suspendisse mattis volutpat augue a venenatis. Donec quis nulla a quam aliquam faucibus in non augue. Nam sodales nisi ac nibh posuere facilisis. Suspendisse pharetra nibh tincidunt, efficitur purus et, blandit ex. Pellentesque commodo mauris malesuada elit dignissim commodo. Suspendisse vehicula non neque ac vestibulum. Nunc non leo a arcu hendrerit condimentum. Duis auctor ligula non enim varius, vitae rutrum purus ultrices.</p>

      <p>Integer ut elit nec leo suscipit posuere eu et sapien. Curabitur vel dolor diam. Curabitur fringilla sapien sit amet lacinia dignissim. Suspendisse sodales vestibulum ultricies. Aliquam eget pulvinar urna. Maecenas eu maximus eros. Aliquam maximus lorem a consequat euismod. Curabitur ac est a turpis mollis accumsan in vitae arcu. Praesent ultrices, turpis et pretium consequat, erat purus bibendum augue, ac placerat nisi metus sed erat. Suspendisse posuere at risus nec auctor. Praesent pretium metus in sapien vulputate, quis feugiat enim iaculis. Vestibulum eget porta urna. Suspendisse ornare lacinia neque dictum fermentum. Mauris pharetra, ex et facilisis sagittis, nunc ligula finibus enim, eget sodales diam sem non ligula. Curabitur id auctor diam, vehicula semper lorem.</p>

      <p>Fusce et enim sed tellus auctor lacinia non in mi. Donec vel vestibulum elit, ut condimentum massa. Aenean faucibus erat vitae diam hendrerit fermentum. Quisque sit amet dui eu leo gravida vestibulum. Vivamus vel velit ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non nibh accumsan nulla tincidunt luctus ut eu urna. Nullam egestas lacinia nibh in hendrerit. Cras ornare ut est sed pellentesque.</p>

      <p>Pellentesque a tristique lacus, eu faucibus elit. Maecenas accumsan vehicula nulla, sed laoreet libero cursus sit amet. Vivamus efficitur tortor et posuere vestibulum. Curabitur non arcu interdum, porttitor ligula in, accumsan lorem. Proin tempus in ligula in dignissim. Nullam ac ornare justo, luctus maximus est. Mauris bibendum sagittis fringilla. Mauris imperdiet aliquet ex quis porttitor. Suspendisse efficitur auctor metus, nec tristique dui pretium in. Duis eleifend mauris non erat ullamcorper fringilla.</p>
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

```
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
