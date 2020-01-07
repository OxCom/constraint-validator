# IsNull
Validates that a value is exactly equal to `null`. To force that a property is blank 
(blank string or null), see the [Blank](Blank.md) constraint. To ensure that a property is not `null`, 
see [NotNull](NotNull.md).

## Options

##### message
type: `string` default: `This value should be null.`  
This is the message that will be shown if the value is not null.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
