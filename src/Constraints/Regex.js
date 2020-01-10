import AbstractConstraint from './AbstractConstraint';
import { trim }           from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not valid.';

export default class Regex extends AbstractConstraint {
    /**
     * @param {{message: string, trim: boolean, match: boolean, pattern: string}} [options]
     */
    constructor(options) {
        super(options);

        if (typeof this.options.pattern !== 'string' && !(this.options.pattern instanceof RegExp)) {
            throw new Error(`Pattern should be type of "string", ${typeof this.options.pattern} given.`);
        }
    }

    /**
     * @return {{message: string, trim: boolean, match: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': false,
            'match': true,
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['pattern'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value)) {
            return;
        }

        if (typeof value !== 'string') {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        const rg = new RegExp(this.options.pattern);

        if (this.options.match && !rg.test(value) || !this.options.match && rg.test(value)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        return;
    }
}
