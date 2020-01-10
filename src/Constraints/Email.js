import AbstractConstraint from './AbstractConstraint';
import { trim }           from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not valid email.';

const MODE_SIMPLE = 'simple_regexp';
const MODE_HTML5 = 'html5_regexp';
const MODE_HTML5_INPUT = 'html5_input';

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidSimple(value) {
    const p = /^.+@\S+\.\S+$/;

    return p.test(value);
}

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidHTML5(value) {
    const p = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    return p.test(value);
}

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidInput(value) {
    const el = document.createElement('input');

    el.setAttribute('type', 'email');
    el.setAttribute('value', value);

    return el.checkValidity();
}

export default class Email extends AbstractConstraint {
    /**
     * @param {{trim: boolean, mode: string, message: string}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [MODE_SIMPLE, MODE_HTML5, MODE_HTML5_INPUT];

        if (!allowed.includes(this.options.mode)) {
            throw new Error(`Invalid validation mode provided: ${this.options.mode}`);
        }
    }

    /**
     * @return {{trim: boolean, mode: string, message: string}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'mode': MODE_HTML5,
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['mode'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param {String} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (typeof value !== 'string' || this.isEmptyValue(value)) {
            return;
        }

        switch (this.options.mode) {
            case MODE_SIMPLE:
                if (!isValidSimple(value)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }
                break;

            case MODE_HTML5:
                if (!isValidHTML5(value)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }
                break;

            case MODE_HTML5_INPUT:
                if (!isValidInput(value)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }

                break;

            default:
                throw new Error(`Invalid validation mode provided: ${this.options.mode}`);
        }

        return;
    }

    static get MODE_SIMPLE() {
        return MODE_SIMPLE;
    }

    static get MODE_HTML5() {
        return MODE_HTML5;
    }

    static get MODE_HTML5_INPUT() {
        return MODE_HTML5_INPUT;
    }
}
