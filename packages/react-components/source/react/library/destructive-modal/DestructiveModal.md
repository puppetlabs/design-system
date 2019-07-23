A `Modal` is a container with arbitrary content that opens above other page
content.

```jsx
import Button from '../button';

const [open, setOpen] = React.useState(false);

<>
  <Button type="danger" onClick={() => setOpen(true)}>Open destructive modal</Button>

  {open && (
    <DestructiveModal onClose={() => setOpen(false)}>
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
    </DestructiveModal>
  )}
</>;
```
