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
     * @return {string[]}
     */
    getRequiredOptions () {
        return [];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate (value) {
        if (typeof value === 'string' && value.length === 0
            || typeof value !== 'string' && typeof value !== 'object' && isNaN(value)
            || typeof value === 'undefined'
            || !this.options.allow_null && value === null
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        return undefined;
    }
}
