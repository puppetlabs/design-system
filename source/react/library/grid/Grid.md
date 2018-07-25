Grid
```js
<Grid columns={ 3 }>
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Collapsed outer
```js
<Grid columns={ 3 } collapse="outer">
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Collapsed inner
```js
<Grid columns={ 3 } collapse="inner">
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Collapsed all
```js
<Grid columns={ 3 } collapse="all">
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Column count on column
```js
<Grid>
  <Grid.Row>
    <Grid.Column columns={ 2 }><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column columns={ 4 }><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column columns={ 6 }><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Vertically divided
```js
<Grid columns={ 3 } divided="vertically">
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```

Grid - Horizontally divided
```js
<Grid columns={ 3 } divided="horizontally">
  <Grid.Row>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
    <Grid.Column><div style={ { background: '#efefef', height: '100px' } }>Content</div></Grid.Column>
  </Grid.Row>
</Grid>
```
