# Length
Validates that a given string length is between some minimum and maximum value.

## Options

##### trim
type: `allow_empty_string` default: `false`  
If set to true, empty strings are considered valid (which is the same behavior as previous Symfony versions). The default false value considers empty strings not valid.

NOTE: *This option does not have any effect when no minimum length is given.*

##### max
type: ```integer```  
This option is the "max" length value. Validation will fail if the given value's length is greater than this max value.

##### message_max
type: `string` default: `This value is too long. It should have {{ limit }} character(s) or less.`  
The message that will be shown if the underlying value's length is more than the max option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The expected maximum length |

##### min
type: `integer`  
This option is the "min" length value. Validation will fail if the given value's length is less than this min value.

This option is required when the max option is not defined.

It is important to notice that NULL values and empty strings are considered valid no matter if the constraint required a minimum length. Validators are triggered only if the value is not blank.

##### message_min
type: `string` default: `This value is too short. It should have {{ limit }} character(s) or more.`

The message that will be shown if the underlying value's length is less than the min option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The expected minimum length |

##### message_exact
type: `string` default: `This value should have exactly {{ limit }} character(s).`  
The message that will be shown if min and max values are equal and the underlying value's length is not exactly this value.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The exact expected length |

##### trim
type: `boolean` default: `true`  
Trim provided value.
