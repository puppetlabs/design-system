## Alert actions

closeable + onClose
```
  <Alert type="info" closeable onClose={() => console.log('theoretically at least')}>
    Did you know this alert can be dismissed?
  </Alert>
```


## Alert types

Success
```
  <Alert type="success">
    Success! Things seem to have gone well afterall.
  </Alert>
```

Danger

```
<Alert type="danger">
  Danger! Things have gone bad. I blame Sig.
</Alert>
```

Warning

```
<Alert type="warning">
  This may affect access for other users.
</Alert>
```

Info

```
<Alert type="info">
  This is some good content. Now you know.
</Alert>
```

## Alert elevation

Elevated
```
<Alert elevated type="danger">
  This alert is elevated. Are you ready for that?
</Alert>
```
