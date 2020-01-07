# Count
Validates that a given collection's (i.e. an array or an object that can be countable) element count is between 
some minimum and maximum value.

**NOTE**: `Int8Array`, ..., `Map`, `Set` and `ArrayBuffer` will be counted as they were initialized. 
See [MDN - Indexed Collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#Indexed_collections)

##### max
type: ```integer```  
This option is the "max" count value. Validation will fail if the given collection elements count is greater than this max value.

##### message_max
type: `string` default: `This collection should contain {{ limit }} elements or less.`

The message that will be shown if the underlying collection elements count is more than the max option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The upper limit |

##### min
type: `integer`  
This option is the "min" count value. Validation will fail if the given collection elements count is less than this min value.

##### message_min
type: `string` default: `This collection should contain {{ limit }} elements or more.`

The message that will be shown if the underlying collection elements count is less than the min option.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The lower limit |

##### message_exact
type: `string` default: `This collection should contain exactly {{ limit }} elements.`

The message that will be shown if min and max values are equal and the underlying collection elements count is not exactly this value.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
| {{ limit }} | The exact expected collection size |
