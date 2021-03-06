# Collection

This constraint is used when the underlying data is a collection (i.e. an array of objects), but you’d like to validate 
different keys of that collection in different ways.

For example, you might validate the _email_ key using the [Email](./Email.md) constraint and the _priority_ key of the 
collection with the [Range](./Range.md) constraint.

This constraint can also make sure that certain collection keys are present and that extra keys are not present.

## Options
##### fields
type: `object`  
This option required and is an object with defining all keys in the collection and, for each key, exactly 
which list of constraints should be executed against that element of the collection, for example:
```javascript
const fields = {
    'email': [
        new NotBlank(),
        new Email(),
    ],
    /* ... other properties ... */
}
```

##### allow_extra_fields
type: `boolean` default: `false`  
If this option is set to **false** and the underlying collection contains one or more elements that are not included in 
the fields option, a validation error will be returned. If set to true, extra fields are OK.

##### message_extra_fields
type: `string` default: `This collection element should not contain extra fields.`  
The message shown if **allow_extra_fields** is **false** and an extra field is detected.
You can use the following parameters in this message:

| Parameter | Description |
|---|---|
| {{ field }} | The current (invalid) field name

## Basic Usage
The Collection constraint allows you to validate the different keys of a collection individually. Take the following example:

```javascript
const data = {
    'user': 1,
    'emails': [
        {email: 'email-1@example.com', priority: 10},
        {email: 'email-2@example.com', priority: 70},    
    ]
};
```

To validate that the _emails_ element has valid property _email_ address and that the _priority_ property is not blank and in a range between 0 and 100, you would do the following:

```javascript
this.form
    .add('user', [/* ... user validation constraints */])
    .add('emails', new Collection({
        'fields': {
            'email': [
                new NotBlank(),
                new Email(),            
            ],
            'priority': [
                new NotBlank(),
                new Range({
                    min: 0,
                    max: 100                                    
                })
            ]
        },
        // other constraint options
        // ...
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
    // 'emails': Map(2) { 0 => { email: [Error, Error] }, 2 => { email: [Error, Error] } },   
    // ...   
}
```
