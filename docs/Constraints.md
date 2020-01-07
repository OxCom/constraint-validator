# Constraints
The Validator is designed to validate objects against constraints. They are assertions that a condition is true.

## Supported constraints
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
- [NegativeOrZero](docs/NegativeOrZero.md)

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

## Create custom constraint

```javascript
import AbstractConstraint from 'AbstractConstraint';

export default class MyAwesomeCheck extends AbstractConstraint {
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
     *
     * @return {Error|undefined}
     */
    validate(value) {
        // provide your custom validation logic
        if (value === this.options.my_option) {
            return undefined;
        }

        // build validate error
        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .build(this.options.message);
    }
}

```
