# Email
Validates that a value is a valid email address.

## Options

##### message
type: `string` default: `This value is not valid email.`

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### mode
type: `string` default: `html5_regexp` Current validation mode.  

Available validation modes are:
- ```simple_regexp```
- ```html5_regexp``` 
- ```html5_input```

##### trim
type: `boolean` default: `true` 
Trim provided value.  

