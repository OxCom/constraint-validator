# NotNull
Validates that a value is not strictly equal to `null`. To force that a property is not blank 
(not blank string), see the [NotBlank](NotBlank.md) constraint. To ensure that a property is `null`, 
see [IsNull](IsNull.md).

## Options

##### message
type: `string` default: `This value should be null.`  
This is the message that will be shown if the value is null.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
