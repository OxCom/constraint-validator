import AbstractConstraint from './AbstractConstraint';
import { trim }           from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not a valid URL.';

const MODE_REGEXP = 'regexp';
const MODE_URL_API = 'url_api';
const MODE_HTML5 = 'html5';

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidRegexp(value) {
    // @see https://github.com/alexcorvi/anchorme.js/blob/gh-pages/src/tests/url.ts
    // eslint-disable-next-line no-useless-escape
    const p = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;

    return !(value.match(p) === null);
}

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidUrlAPI(value) {
    try {
        new URL(value);
    } catch (e) {
        return false;
    }

    return true;
}

/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidHTML5(value) {
    const el = document.createElement('input');

    el.setAttribute('type', 'url');
    el.setAttribute('value', value);

    return el.checkValidity();
}

export default class Url extends AbstractConstraint {
    /**
     * @param {{trim: boolean, mode: string, message: string}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [MODE_REGEXP, MODE_URL_API, MODE_HTML5];

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
            'mode': MODE_URL_API,
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
            case MODE_REGEXP:
                if (!isValidRegexp(value)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }

                break;

            case MODE_URL_API:
                if (!isValidUrlAPI(value)) {
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

            default:
                throw new Error(`Invalid validation mode provided: ${this.options.mode}`);
        }

        return;
    }

    static get MODE_REGEXP() {
        return MODE_REGEXP;
    }

    static get MODE_URL_API() {
        return MODE_URL_API;
    }

    static get MODE_HTML5() {
        return MODE_HTML5;
    }
}
