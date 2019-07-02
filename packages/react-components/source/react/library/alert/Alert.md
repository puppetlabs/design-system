## Alert actions

closeable + onClose

```jsx
<Alert
  type="info"
  closeable
  onClose={() => console.log('theoretically at least')}
>
  Did you know this alert can be dismissed?
</Alert>
```

## Alert types

Success

```jsx
<Alert type="success">Success! Things seem to have gone well afterall.</Alert>
```

Danger

```jsx
<Alert type="danger">Danger! Things have gone bad. I blame Sig.</Alert>
```

Warning

```jsx
<Alert type="warning">This may affect access for other users.</Alert>
```

Info

```jsx
<Alert type="info">This is some good content. Now you know.</Alert>
```

## Alert elevation

Elevated

```jsx
<Alert elevated type="danger">
  This alert is elevated. Are you ready for that?
</Alert>
```
