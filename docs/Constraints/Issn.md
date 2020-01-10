# Issn
Validates that a value is a valid [International Standard Serial Number (ISSN)](https://en.wikipedia.org/wiki/International_Standard_Serial_Number).

## Options

##### trim
type: `boolean` default: `true`  
Trim provided value.

##### case_sensitive
type: `boolean` default: `false`  
The validator will allow ISSN values to end with a lower case 'x' by default. When switching this to true, 
the validator requires an upper case 'X'.

##### hyphen
type: `boolean` default: `false`  
The validator will allow non hyphenated ISSN values by default. When switching this to true, the validator requires a hyphenated ISSN value.

##### message
type: `string` default: `This value is not a valid ISSN.`  
This is the message that will be shown if the value is not null.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
