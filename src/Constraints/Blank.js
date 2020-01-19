import AbstractConstraint from './AbstractConstraint';

const MESSAGE_INVALID = 'This value should be blank.';

export default class Blank extends AbstractConstraint {
    /**
     * @param {{message: string}} [options]
     */
    constructor(options) {
        super(options);
    }

    /**
     * @return {{message: string}}
     */
    getDefaultOptions() {
        return {
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (typeof value === 'string' && value.length > 0
            || (typeof value !== 'string'
                && typeof value !== 'object'
                && !(isNaN(value) || typeof value === 'undefined' || value === null)
            )
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
