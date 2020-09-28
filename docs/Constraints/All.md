# All

This constraint allows you to apply a collection of constraints to each element of the array.

For example, you might validate the list of _emails_ using the [Email](./Email.md) constraint.

## Options
##### constraints
type: ```array```  
This required option is the array of validation constraints that you want to apply to each element of the underlying array.

## Basic Usage
Suppose that you have an array of strings (emails) and you want to validate each entry in that array:

```javascript
const data = {
    'user': 1,
    'emails': [
        'email-1@example.com',
        'email-2@example.com',    
    ]
};
```

To validate that the _emails_ element has no empty strings and each string is a valid email, you would do the following:

```javascript
this.form
    .add('user', [/* ... user validation constraints */])
    .add('emails', new All({
        'constraints': [
            new NotBlank(),
            new Email(),
        ],
    }))
```

## Errors handling
There is different flow to handle errors from this constraint. To keep the order and to provide useful information about
what element triggers error, the errors list for provided filed will have 
type [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)  

Errors example:
```javascript
{
    // ...
    // 'emails': Map(2) { 0 => [Error, Error], 2 => [Error, Error] },   
    // ...   
}
```
