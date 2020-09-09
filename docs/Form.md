# Form
A form composed of fields, each can be validated by provided list of constraints.

## Options

##### extra_fields
type: `boolean` default: `false`  
type: boolean default: false

Usually, if you submit extra fields that aren't configured in your form, you'll get a 
`"This form should not contain extra fields."` validation error.

You can silence this validation error by enabling the `extra_fields` option on the form.

##### extra_fields_message
type: `string` default: `This form should not contain extra fields.`

This is the validation error message that's used if the submitted form data contains one or 
more fields that are not part of the form definition.


## Methods

##### ```add(field, constants, options)```

Add field specification.

| Parameter | Type | Description |
|---|---|---|
| field | string | The validation filed name |
| constants | array |  List of constraints that should be assigned to the field |
| options | object |  Extra options related to the field. Will be passed to each constraint |

**Return**: current ```Form```


##### ```validate(data, options = {})```

Execute form validation.

| Parameter | Type | Description |
|---|---|---|
| data | object | The current form data |
| options | object |  Extra options related to the validation flow. Will be passed to each constraint |

**Return**: object with validation errors.


##### ```getData()```
Return object with current loaded data. If data transformers assigned to the form of field, then it will
be modified data object.

**Return**: object with form data.

##### ```get(name)```
Return object associated with provided field name.

| Parameter | Type | Description |
|---|---|---|
| name | string | The field name |

**Return**: [Field](./Field.md) or ```undefined```.

##### ```addTransformer(transformer)```
Add a transformer to the current form.

| Parameter | Type | Description |
|---|---|---|
| transformer | function | This function will be executed before form validation |

**Return**: current ```Form```

##### ```addReverseTransformer(transformer)```
Add a reverse transformer to the current form.

| Parameter | Type | Description |
|---|---|---|
| transformer | function | This function will be executed after form validation |

**Return**: current ```Form```

## Transformer function
The  signature for ```addTransformer(transformer)``` and ```addReverseTransformer(transformer)``` methods
```javascript
const transformer = function(data, options) {
    // hack, hack, hack ...

    return data;
}
```

| Parameter | Type | Description |
|---|---|---|
| data | object | The current form data |
| options | object | The current form validation options |

**Return**: modified form data ```object```


