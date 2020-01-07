# IsTrue
Validates that a value is false. Specifically, this checks to see if the value is exactly `true`, 
exactly the integer `1`, or exactly the string `"1"`.  
Also see [IsFalse](IsFalse.md)

## Options

##### message
type: `string` default: `This value should be true.`  
This message is shown if the underlying data is not true.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
