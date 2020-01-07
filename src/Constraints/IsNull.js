import AbstractConstraint from './AbstractConstraint';
import { isNull }         from '../Utils/functions';

const MESSAGE_INVALID = 'This value should be null.';

export default class IsNull extends AbstractConstraint {
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
            return undefined;
        }

        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .build(this.options.message);
    }
}
