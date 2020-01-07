import AbstractConstraint from './AbstractConstraint';

const MESSAGE_INVALID = 'This value should be true.';

export default class IsTrue extends AbstractConstraint {
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
        if (value === true || value === 1 || value === '1' || value === null) {
            return undefined;
        }

        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .build(this.options.message);
    }
}
