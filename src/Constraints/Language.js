import AbstractConstraint  from './AbstractConstraint';
import { trim } from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not a valid language.';

/**
 * @type {array}
 */
const list = require('./../languages');

export default class Language extends AbstractConstraint {
    /**
     * Validates that a value is a valid language Unicode language identifier (e.g. fr or zh-Hant).
     *
     * @param {{message: string, trim: boolean}} [options]
     */
    constructor(options) {
        super(options);
    }

    /**
     * @return {{message: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
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
        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value)) {
            return undefined;
        }

        if (typeof value !== 'string' || !list.includes(value.toUpperCase())) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        return undefined;
    }
}

