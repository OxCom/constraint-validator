# Type
Validates that a value is of a specific data type. For example, if a variable should be an array, 
you can use this constraint with the array type option to validate this.

## Options

##### message
type: `string` default: `This value should be of type {{ type }}.`

| Parameter | Description |
|---|---|
| {{ type }} | The expected type
| {{ value }} | The current (invalid) value

##### type
type: `string`

Allowed types are:
- ```array```
- ```date```
- ```bool``` or ```boolean```
- ```function```
- ```float``` or ```double```
- ```int``` or ```integer```
- ```null```
- ```numeric```
- ```object```
- ```string```

Also, you can use ctype_*() functions from corresponding [locutus](https://github.com/kvz/locutus) implementation:
- ```ctype_alnum```
- ```ctype_alpha```
- ```ctype_cntrl```
- ```ctype_digit```
- ```ctype_graph```
- ```ctype_lower```
- ```ctype_print```
- ```ctype_punct```
- ```ctype_space```
- ```ctype_upper```
- ```ctype_xdigit```
