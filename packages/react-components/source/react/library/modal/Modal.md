## Overview

A `Modal` is an accessible dialog box that opens arbitrary content in a container above the rest of the screen and temporarily blocks interactions with content behind it. Modals have a close button in the upper-right but can also be closed by clicking outside the modal or pressing the ESC key. Modals are intended to be used sparingly and generally don't affect the URL unless perhaps via a query parameter.

## Basic use

`Modal` is a controlled component, so you're required to add an `onClick` handler that sets the boolean passed to `isOpen` to false or otherwise conditionally hides it.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open simple modal</Button>

  {open && (
    <Modal onClose={() => setOpen(false)}>
      Non eram nescius, Brute, cum, quae summis ingeniis exquisitaque doctrina
      philosophi Graeco sermone tractavissent, ea Latinis litteris mandaremus,
      fore ut hic noster labor in varias reprehensiones incurreret. nam
      quibusdam, et iis quidem non admodum indoctis, totum hoc displicet
      philosophari. quidam autem non tam id reprehendunt, si remissius agatur,
      sed tantum studium tamque multam operam ponendam in eo non arbitrantur.
      erunt etiam, et ii quidem eruditi Graecis litteris, contemnentes Latinas,
      qui se dicant in Graecis legendis operam malle consumere. postremo aliquos
      futuros suspicor, qui me ad alias litteras vocent, genus hoc scribendi,
      etsi sit elegans, personae tamen et dignitatis esse negent.
    </Modal>
  )}
</>;
```

## Variations

### Title and Actions

The `Modal.Title` and `Modal.Actions` subcomponents should be used when a
heading at the top and buttons at the bottom are desired respectively.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open modal with sub-components</Button>

  {open && (
    <Modal onClose={() => setOpen(false)}>
      <Modal.Title>Liber Secundus</Modal.Title>
      Hic cum uterque me intueretur seseque ad audiendum significarent paratos, Primum,
      inquam, deprecor, ne me tamquam philosophum putetis scholam vobis aliquam explicaturum,
      quod ne in ipsis quidem philosophis magnopere umquam probavi. quando enim Socrates,
      qui parens philosophiae iure dici potest, quicquam tale fecit? eorum erat iste
      mos qui tum sophistae nominabantur, quorum e numero primus est ausus Leontinus
      Gorgias in conventu poscere quaestionem, id est iubere dicere, qua de re quis
      vellet audire. audax negotium, dicerem impudens, nisi hoc institutum postea
      translatum ad philosophos nostros esset.
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Ubmitsay</Button>
        <Button type="tertiary" onClick={() => setOpen(false)}>
          Ancelcay
        </Button>
      </Modal.Actions>
    </Modal>
  )}
</>;
```

### Form in a Modal

A common pattern is to include a Form in a Modal. This may be accomplished by
composing these components.

```jsx
import Button from '../button';
import Form from '../form';

const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open modal with form</Button>

  {open && (
    <Modal onClose={() => setOpen(false)}>
      <Modal.Title>Replete ex hac forma</Modal.Title>
      <Form
        submittable
        cancellable
        onSubmit={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Form.Field
          type="email"
          name="inscriptio"
          label="Inscriptio"
          placeholder="Email"
        />
        <Form.Field
          type="select"
          name="selectBook"
          label="Eligere libro"
          placeholder="Choose a book"
          options={[
            { value: 'one', label: 'Liber Primus' },
            { value: 'two', label: 'Liber Secundus' },
            { value: 'three', label: 'Liber Tertius' },
            { value: 'four', label: 'Liber Quartus' },
            { value: 'five', label: 'Liber Quintus' },
          ]}
        />
        <Form.Field
          type="checkbox"
          name="likesCicero"
          label="Do you like Cicero?"
        />
      </Form>
    </Modal>
  )}
</>;
```

### Actions alignment

Although the design guidelines are to use left aligned buttons on modals and forms, you can override that if necessary with the `actionsPosition` prop on `Modal.Actions`.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>
    Open modal with right-aligned buttons
  </Button>

  {open && (
    <Modal onClose={() => setOpen(false)}>
      <Modal.Title>Right-aligned actions</Modal.Title>
      The Modal.Actions component here has its actionsPosition prop set to "right".
      <Modal.Actions actionsPosition="right">
        <Button onClick={() => setOpen(false)}>Ubmitsay</Button>
        <Button type="tertiary" onClick={() => setOpen(false)}>
          Ancelcay
        </Button>
      </Modal.Actions>
    </Modal>
  )}
</>;
```

### Prevent closing

Closing via the ESC key and clicking outside the modal can be disabled, but that
is not recommended unless special handling of something like a wizard is
required.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button onClick={() => setOpen(true)}>
    Open modal that is hard to close
  </Button>

  {open && (
    <Modal closeOnEscapeAndOverlay={false} onClose={() => setOpen(false)}>
      This modal can only be closed by clicking the "×" button in the
      upper-right of the modal, but not by hitting the escape key or by clicking
      outside the modal.
    </Modal>
  )}
</>;
```

### Confirm an action

If you would like to use a modal with confirm/dismiss buttons, like confirming a destructive action (e.g. "Are you sure you want to delete this?"), refer to the [ConfirmationModal](#/React%20Components/ConfirmationModal) component which simplifies that structure.

## Related

- [ConfirmationModal](#/React%20Components/ConfirmationModal)
