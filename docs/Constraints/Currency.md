# Currency
Validates that a value is a valid [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency name.

## Options

##### message
type: `string` default: `This value is not a valid currency.`  
This is the message that will be shown if the value is not a valid currency.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### trim
type: `boolean` default: `true`  
Trim provided value.  
