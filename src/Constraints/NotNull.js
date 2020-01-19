import AbstractConstraint from './AbstractConstraint';
import { isNull }         from '../Utils/functions';

const MESSAGE_INVALID = 'This value should not be null.';

export default class NotNull extends AbstractConstraint {
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
        if (isNull(value)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
