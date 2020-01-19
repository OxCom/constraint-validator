import AbstractConstraint from './AbstractConstraint';
import ipaddr             from 'ipaddr.js';
import { trim }          from '../Utils/functions';

const MESSAGE_INVALID = 'This is not a valid IP address.';

const MODE_ALL = 'all';
const MODE_V4 = '4';
const MODE_V6 = '6';

const MODE_V4_NO_PRIV = '4_no_priv';
const MODE_V6_NO_PRIV = '6_no_priv';
const MODE_ALL_NO_PRIV = 'all_no_priv';

const MODE_V4_NO_RES = '4_no_res';
const MODE_V6_NO_RES = '6_no_res';
const MODE_ALL_NO_RES = 'all_no_res';

const MODE_V4_PUB = '4_pub';
const MODE_V6_PUB = '6_pub';
const MODE_ALL_PUB = 'all_pub';

/**
 * @param {string} value
 * @param {string} mode
 *
 * @return {boolean}
 */
function isValidV4(value, mode) {
    const addr = ipaddr.parse(value);

    if (addr.kind() !== 'ipv4') {
        return false;
    }

    return !(
        (mode === MODE_V4_NO_PRIV || mode === MODE_ALL_NO_PRIV) && addr.range() === 'private'
        || ((mode === MODE_V4_NO_RES || mode === MODE_ALL_NO_RES) && addr.range() === 'reserved')
        || (
            (mode === MODE_V4_PUB || mode === MODE_ALL_PUB)
            && (addr.range() === 'private' || addr.range() === 'reserved')
        )
    );
}

/**
 * @param {string} value
 * @param {string} mode
 *
 * @return {boolean}
 */
function isValidV6(value, mode) {
    const addr = ipaddr.parse(value);

    if (addr.kind() !== 'ipv6') {
        return false;
    }

    return !(
        (mode === MODE_V6_NO_PRIV || mode === MODE_ALL_NO_PRIV) && addr.range() === 'uniqueLocal'
        || ((mode === MODE_V6_NO_RES || mode === MODE_ALL_NO_RES) && addr.range() === 'reserved')
        || (
            (mode === MODE_V6_PUB || mode === MODE_ALL_PUB)
            && (addr.range() === 'uniqueLocal' || addr.range() === 'reserved')
        )
    );
}

export default class Ip extends AbstractConstraint {
    /**
     * @param {{trim: boolean, mode: string, message: string}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [
            MODE_ALL, MODE_V4, MODE_V6,
            MODE_V4_NO_PRIV, MODE_V6_NO_PRIV, MODE_ALL_NO_PRIV,
            MODE_V4_NO_RES, MODE_V6_NO_RES, MODE_ALL_NO_RES,
            MODE_V4_PUB, MODE_V6_PUB, MODE_ALL_PUB,
        ];

        if (!allowed.includes(this.options.version)) {
            throw new Error(`Invalid validation version provided: ${this.options.version}`);
        }
    }

    /**
     * @return {{trim: boolean, mode: string, message: string}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'version': MODE_V4,
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['version'];
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

        // The null, NaN, undefined and empty strings are considered valid values.
        if (typeof value === 'string' && value.length === 0
            || typeof value !== 'string' && isNaN(value)
            || value === null
            || typeof value === 'undefined'
        ) {
            return;
        }

        // general check that we have valid IP address
        if (!ipaddr.isValid(value) || (!ipaddr.IPv4.isValidFourPartDecimal(value) && !ipaddr.IPv6.isValid(value))) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        switch (this.options.version) {
            case MODE_V4:
            case MODE_V4_NO_PRIV:
            case MODE_V4_NO_RES:
            case MODE_V4_PUB:
                if (!isValidV4(value, this.options.version)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }

                break;

            case MODE_V6:
            case MODE_V6_NO_PRIV:
            case MODE_V6_NO_RES:
            case MODE_V6_PUB:
                if (!isValidV6(value, this.options.version)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }

                break;

            case MODE_ALL_NO_PRIV:
            case MODE_ALL_NO_RES:
            case MODE_ALL_PUB:
                if (!isValidV4(value, this.options.version) && !isValidV6(value, this.options.version)) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .build(this.options.message);
                }

                break;

            case MODE_ALL:
                break;

            default:
                throw new Error(`Invalid validation version provided: ${this.options.version}`);
        }
    }

    static get MODE_ALL() {
        return MODE_ALL;
    }

    static get MODE_V4() {
        return MODE_V4;
    }

    static get MODE_V6() {
        return MODE_V6;
    }

    static get MODE_V4_NO_PRIV() {
        return MODE_V4_NO_PRIV;
    }

    static get MODE_V6_NO_PRIV() {
        return MODE_V6_NO_PRIV;
    }

    static get MODE_ALL_NO_PRIV() {
        return MODE_ALL_NO_PRIV;
    }

    static get MODE_V4_NO_RES() {
        return MODE_V4_NO_RES;
    }

    static get MODE_V6_NO_RES() {
        return MODE_V6_NO_RES;
    }

    static get MODE_ALL_NO_RES() {
        return MODE_ALL_NO_RES;
    }

    static get MODE_V4_PUB() {
        return MODE_V4_PUB;
    }

    static get MODE_V6_PUB() {
        return MODE_V6_PUB;
    }

    static get MODE_ALL_PUB() {
        return MODE_ALL_PUB;
    }
}
