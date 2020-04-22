# Blank
The purpose of the Callback constraint is to create completely custom validation rules.  This process works by 
specifying one or more callback methods, each of which will be called during the validation process.

The callback function will be executed with empty values, so developer should take care about such checks.

## Options

##### callback
type: `function`  
The callback method itself. It should return ```TRUE``` or ```FALSE``` value based on provided logic.

Callback parameters:

| Parameter | Description |
|---|---|
| value | The current value |
| options | Object that contains current form and custom options. See [form methods](../Form.md#Methods) description |

Options example:
```javascript
{
    'form': {}, // current Form object
    'field': {}, // current filed options from Form.add()
    // ...
    'prefix': 'custom options from Form.validate()'
}
```


##### message
type: `string` default: `This value is not a valid.`

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value
