# Positive
Validates that a value is a positive number. Zero is neither positive nor negative, 
so you must use [PositiveOrZero](PositiveOrZero.md) if you want to allow zero as value.

## Options

##### message
type: `string` default: `This value should be positive.`  
The default message supplied when the value is not greater than zero.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value


##### message_strict
type: `string` default: `This values has different types. Given type is {{ compared_type }}; Expected type is {{ expected_type }}.`

| Parameter | Description |
|---|---|
| {{ value_type }} | The current (invalid) value type
| {{ compared_type }} | The expected value type

