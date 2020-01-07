# Range
Validates that a given `number` or `Date` object is between some minimum and maximum.

## Options

##### message
type: `string` default: `This value should be a valid number.`  
The message that will be shown if the underlying value is not a number (per the is_numeric PHP function).

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### max
type: ```integer```  
This required option is the "max" value. Validation will fail if the given value is greater than this max value.

##### message_max
type: `string` default: `This value should be {{ limit }} or less.`  
The message that will be shown if the underlying value is more than the max option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The upper limit |

##### min
type: `integer`  
This required option is the "min" value. Validation will fail if the given value is less than this min value.

##### message_min
type: `string` default: `This value should be {{ limit }} or more.`

The message that will be shown if the underlying value is less than the min option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The lower limit |
