import AbstractConstraint from './AbstractConstraint';
import {trim}             from '../Utils/functions';

const MESSAGE_INVALID = 'Invalid card number.';

export default class Luhn extends AbstractConstraint {
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

        if (/[^0-9-\s]+/.test(value)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        let canonical = value.toString().replace(/\D/g, '');
        let checkSum  = 0;

        for (let i = canonical.length - 1; i >= 0; i -= 2) {
            checkSum += parseInt(canonical.charAt(i));
        }

        for (let i = canonical.length - 2; i >= 0; i -= 2) {
            // checkSum += array_sum(str_split((int) $value[$i] * 2));
            checkSum += (parseInt(canonical.charAt(i)) * 2)
                .toString()
                .split('')
                .reduce((a, b) => {
                    return parseInt(a) + parseInt(b);
                }, 0);
        }

        if (0 === checkSum || 0 !== checkSum % 10) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
