# NotBlank
Validates that a value is blank - meaning equal to an empty string or null.

To force that a value strictly be not equal to ```null```, see the [NotNull](NotNull.md) constraint.

## Options

##### message
type: `string` default: `This value should not be blank.`

| Parameter | Description |
|---|---|
| {{ type }} | The expected type
| {{ value }} | The current (invalid) value
