import AbstractConstraint from './AbstractConstraint';
import {trim}             from '../Utils/functions';
import LocaleDetector     from '../Utils/LocaleDetector';
import list               from '../Resources/locales';

const MESSAGE_INVALID = 'This value is not a valid locale.';

export default class Locale extends AbstractConstraint {
    /**
     * @param {{message: string, trim: boolean}} [options]
     */
    constructor(options = {}) {
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
            return;
        }

        const cValue = LocaleDetector.canonicalize(value);

        if (typeof cValue !== 'string' || !list.includes(cValue)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}

