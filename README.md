# Constraints form validator

[![npm version](https://badge.fury.io/js/constraint-validator.png)](https://badge.fury.io/js/constraint-validator)
[![Build Status](https://travis-ci.org/OxCom/constraint-validator.svg?branch=master)](https://travis-ci.org/OxCom/constraint-validator)
[![codecov](https://codecov.io/gh/OxCom/constraint-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/OxCom/constraint-validator)

This library contains list of classes that allows developers to create custom validation flows.

The main idea to have configured form with rules for each field. Each field can be validated by specific constraint.
 
Validation constraints inspired by [Symfony Constraints](https://symfony.com/doc/current/reference/constraints.html).

## Install
```bash
npm i constraint-validator
```

## Basic usage
```javascript
import {
    Form,
    NotBlank,
    Email,
    Length
} from 'constraint-validator';

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

const result = form.validate({
    email: 'email@example.com',
    password: '1234567',
});

// Object with list of invalid properties. Each property contains array of errors
console.log(result);
```
## Documentation
- [Form](docs/Form.md) - form configuration
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
  
  Other constraints:
  - [Count](docs/Constraints/Count.md)
  - [Issn](docs/Constraints/Issn.md)

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
Investigate and add financial and other number constraints
- Bic
- CardScheme
- Currency
- Luhn
- Iban
- Isbn
- Callback
- All

