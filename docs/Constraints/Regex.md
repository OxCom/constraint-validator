# Regex
Validates that a value matches a regular expression.

## Options

##### match
type: `boolean` default: `true`

If true (or not set), this validator will pass if the given string matches the given pattern 
regular expression. However, when this option is set to false, the opposite will occur: 
validation will pass only if the given string does not match the pattern regular expression.

##### pattern
type: `string`  
This required option is the regular expression pattern that the input will be matched against. 
By default, this validator will fail if the input string does not match this regular 
expression (via the [test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) JavaScript function). However, if match is set to false, then 
validation will fail if the input string does match this pattern.

##### trim
type: `boolean` default: `false`  
Trim provided value.  

##### message
type: `string` default: `This value is not valid.`  
This is the message that will be shown if this validator fails.

| Parameter | Description |
|---|---|
| {{ value }} | The current (invalid) value |
