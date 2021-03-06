# Constraints
The Validator is designed to validate objects against constraints. They are assertions that a condition is true.

## Supported constraints
Basic constraints:
- [NotBlank](./Constraints/NotBlank.md)
- [Blank](./Constraints/Blank.md)
- [NotNull](./Constraints/NotNull.md)
- [IsNull](./Constraints/IsNull.md)
- [IsTrue](./Constraints/IsTrue.md)
- [IsFalse](./Constraints/IsFalse.md)
- [Type](./Constraints/Type.md)

String constraints:
- [Email](./Constraints/Email.md)
- [Length](./Constraints/Length.md)
- [Url](./Constraints/Url.md)
- [Regex](./Constraints/Regex.md)
- [Ip](./Constraints/Ip.md)
- [Json](./Constraints/Json.md)

Comparison constraints:
- [EqualTo](./Constraints/EqualTo.md)
- [NotEqualTo](./Constraints/NotEqualTo.md)
- [LessThan](./Constraints/LessThan.md)
- [LessThanOrEqual](./Constraints/LessThanOrEqual.md)
- [GreaterThan](./Constraints/GreaterThan.md)
- [GreaterThanOrEqual](./Constraints/GreaterThanOrEqual.md)
- [Range](./Constraints/Range.md)
- [DivisibleBy](./Constraints/DivisibleBy.md)

Number constraints:
- [Positive](./Constraints/Positive.md)
- [PositiveOrZero](./Constraints/PositiveOrZero.md)
- [Negative](./Constraints/Negative.md)
- [NegativeOrZero](./NegativeOrZero.md)

Date constraints:
- [DateTime](./Constraints/DateTime.md)
- [Timezone](./Constraints/Timezone.md)

Choice constraints:
- [Choice](./Constraints/Choice.md)
- [Language](./Constraints/Language.md)
- [Locale](./Constraints/Locale.md)
- [Country](./Constraints/Country.md)

Financial and other Number Constraints:
- [Iban](./Constraints/Iban.md)
- [Bic](./Constraints/Bic.md)
- [CardScheme](./Constraints/CardScheme.md)
- [Currency](./Constraints/Currency.md)
- [Isbn](./Constraints/Isbn.md)
- [Issn](./Constraints/Issn.md)
- [Luhn](./Constraints/Luhn.md)

Other constraints:
- [Count](./Constraints/Count.md)
- [Callback](./Constraints/Callback.md)
- [Collection](./Constraints/Collection.md)
- [All](./Constraints/All.md)

## Create custom constraint

```javascript
import { AbstractConstraint } from 'constraint-validator';

export default class MyAwesomeConstraint extends AbstractConstraint {
    /**
     * @return {{message: string}}
     */
    getDefaultOptions() {
        return {
            // provide list of default configuration values
            'message': 'My Awesome constraint failed',
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        // provide list of required configuration options
        return ['my_option'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     * @param {{}} [options]
     *
     * @return {Error|undefined}
     */
    validate(value, options = {}) {
        // provide your custom validation logic
        let isValid = false;

        /** 
         * hack, hack, hack ...
         * isValid => true || false 
         */

        if (!isValid) {
            // build validation error
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
```
