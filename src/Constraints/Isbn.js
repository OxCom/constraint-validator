import AbstractConstraint  from './AbstractConstraint';
import { isNumeric, trim } from '../Utils/functions';

const MESSAGE_INVALID = 'This value is neither a valid ISBN-10 nor a valid ISBN-13.';
const MESSAGE_INVALID_10 = 'This value is not a valid ISBN-10.';
const MESSAGE_INVALID_13 = 'This value is not a valid ISBN-13.';

const MODE_ALL = null;
const MODE_ISBN_10 = 'isbn10';
const MODE_ISBN_13 = 'isbn13';

/**
 * @param {string} value
 * @return {boolean}
 */
function isValidIsbn10(value) {
    if (!/^[\d|X]+$/.test(value) || value.length !== 10) {
        return false;
    }

    let checkSum = 0;

    for (let i = 0; i < 10; i++) {
        let digit = value.charAt(i) === 'X' ? 10 : parseInt(value.charAt(i));

        checkSum += digit * (10 - i);
    }

    return checkSum % 11 === 0;
}

/**
 * @param {string} value
 * @return {boolean}
 */
function isValidIsbn13(value) {

    if (!isNumeric(value) || value.length !== 13) {
        return false;
    }

    let checkSum = 0;

    for (let i = 0; i < 13; i += 2) {
        checkSum += parseInt(value.charAt(i));
    }

    for (let i = 1; i < 12; i += 2) {
        checkSum += parseInt(value.charAt(i)) * 3;
    }

    return checkSum % 10 === 0;
}


export default class Isbn extends AbstractConstraint {
    /**
     * @param {{message: string, trim: boolean, message: string, message_isbn10: string, message_isbn13: string}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [MODE_ALL, MODE_ISBN_10, MODE_ISBN_13];

        const mode = this.options.mode === null ? null : this.options.mode.toLowerCase();
        if (!allowed.includes(mode)) {
            throw new Error(`Invalid validation mode provided: ${this.options.mode}`);
        }
    }

    /**
     * @return {{message: string, trim: boolean, message: string, message_isbn10: string, message_isbn13: string}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'mode': MODE_ALL,
            'message': MESSAGE_INVALID,
            'message_isbn10': MESSAGE_INVALID_10,
            'message_isbn13': MESSAGE_INVALID_13,
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

        if (typeof value !== 'string') {
            value += '';
        }

        const canonical = value.replace(/-/g, '', value).toUpperCase();

        if (this.options.mode === MODE_ISBN_10) {
            if (!isValidIsbn10(canonical)) {
                return this
                    .getViolationBuilder()
                    .setParameter('value', value)
                    .build(this.options.message_isbn10);
            }

            return;
        }

        if (this.options.mode === MODE_ISBN_13) {
            if (!isValidIsbn13(canonical)) {
                return this
                    .getViolationBuilder()
                    .setParameter('value', value)
                    .build(this.options.message_isbn13);
            }
        }

        if (!isValidIsbn10(canonical) && !isValidIsbn13(canonical)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }

    static get MODE_ALL() {
        return MODE_ALL;
    }

    static get MODE_ISBN_10() {
        return MODE_ISBN_10;
    }

    static get MODE_ISBN_13() {
        return MODE_ISBN_13;
    }
}
