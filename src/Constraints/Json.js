import AbstractConstraint from './AbstractConstraint';

const MESSAGE_INVALID = 'This value should be valid JSON.';

export default class Json extends AbstractConstraint {
    /**
     * @param {{message: string}} [options]
     */
    constructor(options = {}) {
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
        try {
            JSON.parse(value);
        } catch (e) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
