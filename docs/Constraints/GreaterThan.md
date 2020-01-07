# GreaterThan
Validates that a value is greater than another value, defined in the options. 
To force that a value is greater than or equal to another value, see [GreaterThanOrEqual](GreaterThanOrEqual.md).
To force a value is less than another value, see [LessThan](LessThan.md).

## Options

##### message
type: `string` default: `This value should be greater than {{ compared_value }}.`  
This is the message that will be shown if the value is not greater than the comparison value.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
| {{ compared_value }} | The expected value
| {{ compared_value_type }} | The expected value type

##### value
type: `number|Date`  
This option is required. It defines the value to compare to. It can be a number or date object.

##### strict
type: `boolean` default: `false` 
Use this option to force strict mode checks.

##### message_strict
type: `string` default: `This values has different types. Given type is {{ compared_type }}; Expected type is {{ expected_type }}.`

| Parameter | Description |
|---|---|
| {{ value_type }} | The current (invalid) value type
| {{ compared_type }} | The expected value type

##### locale_string
type: `string` default: `en-US`
User this option to set current locale to provide custom configuration for DateTime formatting.

##### locale_options
type: `object` default: `{}`
User this option to configure Intl DateTime formatting. 
See [configuration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) options.
