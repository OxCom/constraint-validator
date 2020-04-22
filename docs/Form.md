# Form
A form is composed of fields, each can be validated by provided list of constraints.

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
