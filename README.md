# Constraints form validator

[![npm version](https://badge.fury.io/js/constraint-validator.png)](https://badge.fury.io/js/constraint-validator)
[![Build Status](https://travis-ci.org/OxCom/constraint-validator.svg?branch=master)](https://travis-ci.org/OxCom/constraint-validator)
[![codecov](https://codecov.io/gh/OxCom/constraint-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/OxCom/constraint-validator)

This library contains list of classes that allows developers to create custom validation flows.

The main idea to have configured form with rules for each field. Each field can be validated by specific constraint.
 
Validation constraints inspired by [Symfony Constraints](https://symfony.com/doc/current/reference/constraints.html).

## Install
```bash
npm i constraint-validator --save
```

## Basic usage

##### CommonJS module
```javascript
var validator = require("constraint-validator");
var form = new validator.Form();

form
    .add('email', [
        new validator.NotBlank(),
        new validator.Email(),
    ])
    .add('password', [
        new validator.NotBlank(),
        new validator.Length({min: 6}),
    ]);
    
var errors = form.validate({
    email: 'email@example.com',
    password: '123456',
});
```

##### ESM module
```javascript
import { Form, NotBlank, Email, Length } from 'constraint-validator';

const form = new Form();

form
    .add('email', [
        new NotBlank(),
        new Email(),
    ])
    .add('password', [
        new NotBlank(),
        new Length({min: 6}),
    ]);

const errors = form.validate({
    email: 'email@example.com',
    password: '1234567',
});
```

##### Error handing
In case of form data is not valid the ```errors``` object contains properties (related to from filed names) and array of [Error](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Error) objects.
```javascript
{
    'email': [
        Error,
        Error,
    ],
    'password': [
        Error,
    ]   
}
```

Otherwise ```error``` variable will be empty object ```{}```

## Data transformers
Data transformers are used to translate the data for a field into a other format and back. The data transformers
act as middleware and will be executed in the same order as they were applied.

There are 2 types of data transformers:
- **transformer** - executes before validation process
- **reverseTransformers** - executes after validation process

#### Form data transformers
```javascript
import { Form, NotBlank, Email } from 'constraint-validator';

const form = new Form();

form
    .add('email', [
        new NotBlank(),
        new Email(),
    ])
    // next transformers will be applied to the form data
    .addTransformer(data => {
        data.email += '@example.com'

        return data;
    })
    .addReverseTransformer(data => {
        data.email = data.email.replace(/@example.com/, '@example.me');
        
        return data; 
    });

form.validate({email: 'email'});

console.log(form.getData());
// Output:
// {"email": "email@example.me"}
```

#### Field data transformers 
```javascript
import { Form, NotBlank, Email } from 'constraint-validator';

const form = new Form();

form
    .add('email', [
        new NotBlank(),
        new Email(),
    ])
    .get('email')
    // next transformers will be applied to the 'email' field only
    .addTransformer(value => value + '@example.com')
    .addReverseTransformer(value => value.replace(/@example.com/, '@example.me'));

form.validate({email: 'email'});

console.log(form.getData());
// Output:
// {"email": "email@example.me"}
```


## Documentation
- [Form](docs/Form.md) - form configuration
- [Field](docs/Field.md) - form field object
- [Constraints](docs/Constraints.md) - list of supported constraints
  Basic constraints:
  - [NotBlank](docs/Constraints/NotBlank.md)
  - [Blank](docs/Constraints/Blank.md)
  - [NotNull](docs/Constraints/NotNull.md)
  - [IsNull](docs/Constraints/IsNull.md)
  - [IsTrue](docs/Constraints/IsTrue.md)
  - [IsFalse](docs/Constraints/IsFalse.md)
  - [Type](docs/Constraints/Type.md)
  
  String constraints:
  - [Email](docs/Constraints/Email.md)
  - [Length](docs/Constraints/Length.md)
  - [Url](docs/Constraints/Url.md)
  - [Regex](docs/Constraints/Regex.md)
  - [Ip](docs/Constraints/Ip.md)
  - [Json](docs/Constraints/Json.md)
  
  Comparison constraints:
  - [EqualTo](docs/Constraints/EqualTo.md)
  - [NotEqualTo](docs/Constraints/NotEqualTo.md)
  - [LessThan](docs/Constraints/LessThan.md)
  - [LessThanOrEqual](docs/Constraints/LessThanOrEqual.md)
  - [GreaterThan](docs/Constraints/GreaterThan.md)
  - [GreaterThanOrEqual](docs/Constraints/GreaterThanOrEqual.md)
  - [Range](docs/Constraints/Range.md)
  - [DivisibleBy](docs/Constraints/DivisibleBy.md)
  
  Number constraints:
  - [Positive](docs/Constraints/Positive.md)
  - [PositiveOrZero](docs/Constraints/PositiveOrZero.md)
  - [Negative](docs/Constraints/Negative.md)
  - [NegativeOrZero](docs/Constraints/NegativeOrZero.md)
  
  Date constraints:
  - [DateTime](docs/Constraints/DateTime.md)
  - [Timezone](docs/Constraints/Timezone.md)
  
  Choice constraints:
  - [Choice](docs/Constraints/Choice.md)
  - [Language](docs/Constraints/Language.md)
  - [Locale](docs/Constraints/Locale.md)
  - [Country](docs/Constraints/Country.md)
  
  Financial and other Number Constraints:
  - [Iban](docs/Constraints/Iban.md)
  - [Bic](docs/Constraints/Bic.md)
  - [CardScheme](docs/Constraints/CardScheme.md)
  - [Currency](docs/Constraints/Currency.md)
  - [Isbn](docs/Constraints/Isbn.md)
  - [Issn](docs/Constraints/Issn.md)
  - [Luhn](docs/Constraints/Luhn.md)
  
  Other constraints:
  - [Count](docs/Constraints/Count.md)
  - [Callback](docs/Constraints/Callback.md)
  - [Collection](docs/Constraints/Collection.md)
  - [All](docs/Constraints/All.md)

You can [create custom constrains](./docs/Constraints.md#create-custom-constraint) by using deep integration.

## Dependencies
- [locutus](https://github.com/kvz/locutus) - JavaScript implementation of PHP functions
- [Luxon Moment](https://github.com/moment/luxon) - DateTime manipulation library
- [IpAddrJs](https://github.com/whitequark/ipaddr.js) - IP address manipulation library

## Notes
**Q**: Why not exceptions?  
**A**: See [try/catch](https://jsperf.com/try-catch-performance-jls/10) performance test

**Q**: Is there same logic as symfony has?  
**A**: No, please check documentation for each constraint

## TODO
- Provide ```types.d.ts``` for better user experience
- CI/CD build flow (drop ```dist``` folder)
- Proper package integration (get IDE autocomplete working better)
- Investigate [DayJS](https://github.com/iamkun/dayjs) as replacements: find a way to validate timezones.

