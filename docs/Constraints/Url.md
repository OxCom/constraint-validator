# Url
Validates that a value is a valid URL string.

## Options

##### message
type: `string` default: `This value is not a valid URL.`  
This message is shown if the URL is invalid.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### mode
type: `string` default: `url_api` Current validation mode.  

Available validation modes are:
- ```regexp```
- ```url_api``` 
- ```html5```

##### trim
type: `boolean` default: `true` 
Trim provided value.  
