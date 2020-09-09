# Field
A field object that represents input data field.

## Options

##### map_name
type: `string` default: `undefined`  

Usually, if you have validation error it will be assigned to configured field. At some cases
you have to show this error on the different field.  
This option used to specify the field name that should be used when error appears.

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


