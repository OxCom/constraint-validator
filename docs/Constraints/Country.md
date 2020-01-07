# Country
Validates that a value is a valid [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) alpha-2, alpha-3 and numeric country code.

## Options

##### message
type: `string` default: `This value is not a valid country.`

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value

##### mode
type: `string` default: `alpha2` Current validation mode.  

Available modes are:
- ```alpha2```
- ```alpha3``` 
- ```numeric```

