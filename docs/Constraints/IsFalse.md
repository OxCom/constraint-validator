# IsFalse
Validates that a value is false. Specifically, this checks to see if the value is exactly `false`, 
exactly the integer `0`, or exactly the string `"0"`.  
Also see [IsTrue](IsTrue.md)

## Options

##### message
type: `string` default: `This value should be false.`  
This message is shown if the underlying data is not false.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
