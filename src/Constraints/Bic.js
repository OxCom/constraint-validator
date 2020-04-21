import AbstractConstraint from './AbstractConstraint';
import {isString, trim} from '../Utils/functions';
import list from '../Resources/countries';

const MESSAGE_INVALID = 'This is not a valid Business Identifier Code (BIC).';
const MESSAGE_WITH_IBAN = 'This Business Identifier Code (BIC) is not associated with IBAN {{ iban }}.';

const BIC_MAP = {
    // Reference: https://www.ecbs.org/iban/france-bank-account-number.html
    'GF': 'FR', // French Guiana
    'PF': 'FR', // French Polynesia
    'TF': 'FR', // French Southern Territories
    'GP': 'FR', // Guadeloupe
    'MQ': 'FR', // Martinique
    'YT': 'FR', // Mayotte
    'NC': 'FR', // New Caledonia
    'RE': 'FR', // Reunion
    'PM': 'FR', // Saint Pierre and Miquelon
    'WF': 'FR', // Wallis and Futuna Islands
    // Reference: https://www.ecbs.org/iban/united-kingdom-uk-bank-account-number.html
    'JE': 'GB', // Jersey
    'IM': 'GB', // Isle of Man
    'GG': 'GB', // Guernsey
    'VG': 'GB', // British Virgin Islands
};


/**
 * @param {string} value
 *
 * @return {boolean}
 */
function isValidAlpha2(value) {
    const result = list.find(({a2}) => a2.toUpperCase() === value.toUpperCase());

    return result !== undefined;
}

export default class Bic extends AbstractConstraint {
    /**
     * @param {{message: string, message_iban: string, iban_path: string, trim: boolean}} [options]
     */
    constructor(options) {
        super(options);
    }

    /**
     * @return {{message: string, message_iban: string, iban_path: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
            'message_iban': MESSAGE_WITH_IBAN,
            'iban_path': null,
        };
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value, options = {form: {}}) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value)) {
            return;
        }

        if (typeof value !== 'string') {
            value += '';
        }

        const canonical = value.replace(/ /g, '', value);

        // the bic must be either 8 or 11 characters long
        if (![8, 11].includes(canonical.length)
            // must contain alphanumeric values only
            || !/^[A-Z0-9]+$/.test(canonical)
            // first 4 letters must be alphabetic (bank code) and contain uppercase characters only
            || !/^[A-Z]{4}/.test(canonical)
            // 5 + 6 letters should point to valid country
            || !isValidAlpha2(canonical.substring(4, 6))
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        if (this.options.iban_path !== null && isString(this.options.iban_path)) {
            // we assume that we have valid IBAN
            const iban = options.form[this.options.iban_path];

            if (this.isEmptyValue(iban)) {
                return;
            }

            const ibanCode = iban.substring(0, 2);
            const bicCode = canonical.substring(4, 6);

            if (ibanCode === bicCode || ibanCode === BIC_MAP[bicCode]) {
                return;
            }

            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .setParameter('iban', iban)
                .build(this.options.message_iban);
        }
    }
}
