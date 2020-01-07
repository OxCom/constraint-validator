# NegativeOrZero
Validates that a value is a negative number or equal to zero. 
If you don't want to allow zero as value, use [Negative](Negative.md) instead.

## Options

##### message
type: `string` default: `This value should be negative or zero.`  
The default message supplied when the value is not less than or equal to zero.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value


##### message_strict
type: `string` default: `This values has different types. Given type is {{ compared_type }}; Expected type is {{ expected_type }}.`

| Parameter | Description |
|---|---|
| {{ value_type }} | The current (invalid) value type
| {{ compared_type }} | The expected value type

