# Field
A field object that represents input data field.

## Methods

##### ```addTransformer(transformer)```
Add a transformer to the current form field.

| Parameter | Type | Description |
|---|---|---|
| transformer | function | This function will be executed before field validation |

**Return**: current ```Field```

##### ```addReverseTransformer(transformer)```
Add a reverse transformer to the current form.

| Parameter | Type | Description |
|---|---|---|
| transformer | function | This function will be executed after field validation |

**Return**: current ```Field```

## Transformer function
The  signature for ```addTransformer(transformer)``` and ```addReverseTransformer(transformer)``` methods
```javascript
const transformer = function(value, options) {
    // hack, hack, hack ...

    return value;
}
```

| Parameter | Type | Description |
|---|---|---|
| data | object | The current form data |
| options | object | The current form validation options |

**Return**: modified form data ```object```


