import AbstractConstraint  from './AbstractConstraint';
import { isNumeric, trim } from '../Utils/functions';
import list from '../Resources/countries';

const MESSAGE_INVALID = 'This value is not a valid country.';

const MODE_ALPHA2 = 'alpha2';
const MODE_ALPHA3 = 'alpha3';
const MODE_NUMERIC = 'numeric';

/**
 * @param {string} value
 * @param {string} mode
 *
 * @return {boolean}
 */
function isValidAlpha2(value, mode) {
    if (mode !== MODE_ALPHA2) {
        return false;
    }

    const result = list.find(({a2}) => a2.toUpperCase() === value.toUpperCase());

    return result !== undefined;
}

/**
 * @param {string} value
 * @param {string} mode
 *
 * @return {boolean}
 */
function isValidAlpha3(value, mode) {
    if (mode !== MODE_ALPHA3) {
        return false;
    }

    const result = list.find(({a3}) => a3.toUpperCase() === value.toUpperCase());

    return result !== undefined;
}

/**
 * @param {string} value
 * @param {string} mode
 *
 * @return {boolean}
 */
function isValidNumeric(value, mode) {
    if (mode !== MODE_NUMERIC) {
        return false;
    }

    const result = list.find(({n}) => n.toUpperCase() === value.toUpperCase());

    return result !== undefined;
}

export default class Country extends AbstractConstraint {
    /**
     * Validates that a value is a valid ISO 3166-1 alpha-2, alpha-3 and numeric country code.
     *
     * @param {{message: string, mode: string, trim: boolean}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [MODE_ALPHA2, MODE_ALPHA3, MODE_NUMERIC];

        if (!allowed.includes(this.options.mode)) {
            throw new Error(`Invalid validation mode provided: ${this.options.mode}`);
        }
    }

    /**
     * @return {{message: string, mode: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
            'mode': MODE_ALPHA2,
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
        if (isNumeric(value)) {
            value = String(value).padStart(3, '0');
        }

        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value)) {
            return;
        }

        if (typeof value !== 'string'
            || (
                !isValidAlpha2(value, this.options.mode)
                && !isValidAlpha3(value, this.options.mode)
                && !isValidNumeric(value, this.options.mode)
            )
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }

    static get MODE_ALPHA2() {
        return MODE_ALPHA2;
    }

    static get MODE_ALPHA3() {
        return MODE_ALPHA3;
    }

    static get MODE_NUMERIC() {
        return MODE_NUMERIC;
    }
}

