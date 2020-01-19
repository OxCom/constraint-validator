import AbstractConstraint from './AbstractConstraint';

const MESSAGE_INVALID = 'This value should not be blank.';

export default class NotBlank extends AbstractConstraint {
    /**
     * @param {{message: string, allow_null: boolean}} [options]
     */
    constructor (options) {
        super(options);
    }

    /**
     * @return {{min: null, max: null, message_mix: string, message_max: string, message_exact: string}}
     */
    getDefaultOptions () {
        return {
            'message': MESSAGE_INVALID,
            'allow_null': false
        };
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate (value) {
        if (this.isEmptyValue(value)) {
            return;
        }

        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .build(this.options.message);
    }
}
