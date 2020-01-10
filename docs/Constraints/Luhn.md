# Luhn
This constraint is used to ensure that a credit card number passes the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). It is useful as a first step to validating a credit card: before communicating with a payment gateway.

## Options

##### message
type: `string` default: `Invalid card number.`  
The default message supplied when the value does not pass the Luhn check.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### trim
type: `boolean` default: `true`  
Trim provided value.  
