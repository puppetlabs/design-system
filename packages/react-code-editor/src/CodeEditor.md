```
<div>
  <CodeEditor
    name="UNIQUE_ID_OF_DIV_1"
    onChange={a => console.log('onChange!', a)}
  />
</div>
```
Read only

```
<div>
  <CodeEditor
    name="UNIQUE_ID_OF_DIV_2"
    value={`apiVersion: v1\nversion: 0.1.6\ndescription: "Some stuff I found on the ground"\nitems:\n- potatoes\n- carrots\n- cabbage`}
    readOnly={true}
  />
</div>
```
