import AbstractConstraint                     from './AbstractConstraint';
import { isArray, isNumeric, isString, trim } from '../Utils/functions';

const MESSAGE_INVALID = 'Unsupported card type or invalid card number.';

const SCHEMA_AMEX = 'AMEX';
const SCHEMA_CHINA_UNIONPAY = 'CHINA_UNIONPAY';
const SCHEMA_DINERS = 'DINERS';
const SCHEMA_DISCOVER = 'DISCOVER';
const SCHEMA_INSTAPAYMENT = 'INSTAPAYMENT';
const SCHEMA_JCB = 'JCB';
const SCHEMA_LASER = 'LASER';
const SCHEMA_MAESTRO = 'MAESTRO';
const SCHEMA_MASTERCARD = 'MASTERCARD';
const SCHEMA_MIR = 'MIR';
const SCHEMA_UATP = 'UATP';
const SCHEMA_VISA = 'VISA';

const schemas = {
    // American Express card numbers start with 34 or 37 and have 15 digits.
    [SCHEMA_AMEX]: [
        /^3[47][0-9]{13}$/,
    ],
    // China UnionPay cards start with 62 and have between 16 and 19 digits.
    // Please note that these cards do not follow Luhn Algorithm as a checksum.
    [SCHEMA_CHINA_UNIONPAY]: [
        /^62[0-9]{14,17}$/,
    ],
    // Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits.
    // There are Diners Club cards that begin with 5 and have 16 digits.
    // These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
    [SCHEMA_DINERS]: [
        /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    ],
    // Discover card numbers begin with 6011, 622126 through 622925, 644 through 649 or 65.
    // All have 16 digits.
    [SCHEMA_DISCOVER]: [
        /^6011[0-9]{12}$/,
        /^64[4-9][0-9]{13}$/,
        /^65[0-9]{14}$/,
        /^622(12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|91[0-9]|92[0-5])[0-9]{10}$/,
    ],
    // InstaPayment cards begin with 637 through 639 and have 16 digits.
    [SCHEMA_INSTAPAYMENT]: [
        /^63[7-9][0-9]{13}$/,
    ],
    // JCB cards beginning with 2131 or 1800 have 15 digits and JCB cards beginning with 35 have 16 digits.
    [SCHEMA_JCB]: [
        /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
    ],
    // Laser cards begin with either 6304, 6706, 6709 or 6771 and have between 16 and 19 digits.
    [SCHEMA_LASER]: [
        /^(6304|670[69]|6771)[0-9]{12,15}$/,
    ],
    // Maestro international cards begin with 675900..675999 and have between 12 and 19 digits.
    // Maestro UK cards begin with either 500000..509999 or 560000..699999 and have between 12 and 19 digits.
    [SCHEMA_MAESTRO]: [
        /^(6759[0-9]{2})[0-9]{6,13}$/,
        /^(50[0-9]{4})[0-9]{6,13}$/,
        /^5[6-9][0-9]{10,17}$/,
        /^6[0-9]{11,18}$/,
    ],
    // All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
    // October 2016 MasterCard numbers can also start with 222100 through 272099.
    [SCHEMA_MASTERCARD]: [
        /^5[1-5][0-9]{14}$/,
        /^2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12})$/,
    ],
    // Payment system MIR numbers start with 220, then 1 digit from 0 to 4, then 12 digits
    [SCHEMA_MIR]: [
        /^220[0-4][0-9]{12}$/,
    ],
    // All UATP card numbers start with a 1 and have a length of 15 digits.
    [SCHEMA_UATP]: [
        /^1[0-9]{14}$/,
    ],
    // All Visa card numbers start with a 4 and have a length of 13, 16, or 19 digits.
    [SCHEMA_VISA]: [
        /^4([0-9]{12}|[0-9]{15}|[0-9]{18})$/,
    ],
};

export default class CardScheme extends AbstractConstraint {
    /**
     * @param {{message: string, schemas: array|string, trim: boolean}} [options]
     */
    constructor(options) {
        super(options);

        this.options.schemas = isString(this.options.schemas) ? [this.options.schemas] : this.options.schemas;

        if (!isArray(this.options.schemas)) {
            throw new Error(`Value should be type of "array" or "string", "${typeof this.options.schemas}" given.`);
        }

        if (this.options.schemas.length === 0) {
            throw new Error('The schemas list cannot be empty.');
        }

        const allowed = Object.keys(schemas);
        const filtered = this.options.schemas.filter(schema => {
            return allowed.includes(schema.toUpperCase());
        });

        if (filtered.length !== this.options.schemas.length) {
            throw new Error('The schemas list contains one or more unsupported elements.');
        }
    }

    /**
     * @return {{message: string}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
        };
    }

    getRequiredOptions() {
        return ['schemas'];
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

        if (isNumeric(value)) {
            for (const scheme of this.options.schemas) {
                for (const rg of schemas[scheme]) {
                    if (rg.test(value)) {
                        return;
                    }
                }
            }
        }

        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .build(this.options.message);
    }

    static get SCHEMA_AMEX() {
        return SCHEMA_AMEX;
    }

    static get SCHEMA_CHINA_UNIONPAY() {
        return SCHEMA_CHINA_UNIONPAY;
    }

    static get SCHEMA_DINERS() {
        return SCHEMA_DINERS;
    }

    static get SCHEMA_DISCOVER() {
        return SCHEMA_DISCOVER;
    }

    static get SCHEMA_INSTAPAYMENT() {
        return SCHEMA_INSTAPAYMENT;
    }

    static get SCHEMA_JCB() {
        return SCHEMA_JCB;
    }

    static get SCHEMA_LASER() {
        return SCHEMA_LASER;
    }

    static get SCHEMA_MAESTRO() {
        return SCHEMA_MAESTRO;
    }

    static get SCHEMA_MASTERCARD() {
        return SCHEMA_MASTERCARD;
    }

    static get SCHEMA_MIR() {
        return SCHEMA_MIR;
    }

    static get SCHEMA_UATP() {
        return SCHEMA_UATP;
    }

    static get SCHEMA_VISA() {
        return SCHEMA_VISA;
    }
}
