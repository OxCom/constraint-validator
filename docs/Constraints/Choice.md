# Choice
This constraint is used to ensure that the given value is one of a given set of valid choices. 
It can also be used to validate that each item in an array of items is one of those valid choices.

## Options

##### choices
type: `array`  
A required option. This is the array of options that should be considered in the valid set.
The input value will be matched against this array.

##### message
type: `string` default: `The value you selected is not a valid choice.`  
This is the message that you will receive if the multiple option is set to false and the 
underlying value is not in the valid array of choices.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### max
type: ```integer```  
If the multiple option is true, then you can use the max option to force no more than XX number of values to be selected. 
For example, if max is 3, but the input array contains 4 valid items, the validation will fail.

##### message_max
type: `string` default: `You must select at most {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too many options per the max option.

You can use the following parameters in this message:

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ choices }} | A comma-separated list of available choices |

##### min
type: `integer`  
If the multiple option is true, then you can use the min option to force at least XX number of values to be selected. 
For example, if min is 3, but the input array only contains 2 valid items, the validation will fail.

##### message_min
type: `string` default: `You must select at least {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too few choices per the min option.

You can use the following parameters in this message:

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ choices }} | A comma-separated list of available choices |

##### multiple
type: `boolean` default: `false`  
If this option is true, the input value is expected to be an array instead of a single, scalar value. 
The constraint will check that each value of the input array can be found in the array of valid choices. 
If even one of the input values cannot be found, the validation will fail.

##### message_multiple
type: `string` default: `One or more of the given values is invalid.`

This is the message that you will receive if the multiple option is set to true and one of the values on the 
underlying array being checked is not in the array of valid choices.

You can use the following parameters in this message:

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ choices }} | A comma-separated list of available choices |

##### message
type: `string` default: `The value you selected is not a valid choice.`

This is the message that you will receive if the multiple option is set to false and the 
underlying value is not in the valid array of choices.

You can use the following parameters in this message:

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ choices }} | A comma-separated list of available choices |
