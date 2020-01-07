# Language
Validates that a value is a valid language Unicode language identifier (e.g. fr or zh-Hant).

## Options

##### message
type: `string` default: `This value is not a valid language.`  
This message is shown if the string is not a valid language code.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### trim
type: `boolean` default: `true`  
Trim provided value.  
