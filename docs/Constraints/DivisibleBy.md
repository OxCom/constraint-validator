# DivisibleBy
Validates that a value is divisible by another value, defined in the options.

## Options

##### value
type: `integer|float`  
This option is required. It defines the value to compare to. It can be a number or float.

##### message
type: `string` default: `This value should be a multiple of {{ compared_value }}.`  
This is the message that will be shown if the value is not divisible by the comparison value.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
| {{ compared_value }} | The current validation value

##### message_type
type: `string` default: `This values has different types. Given type is "{{ current_type }}"; Expected type is "{{ expected_type }}".`  
This is the message that will be shown if the value has invalid type.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
| {{ compared_value }} | The current validation value
| {{ current_type }} | The type of current value
| {{ expected_type }} | The expected type of value
