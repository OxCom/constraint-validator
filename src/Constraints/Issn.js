import AbstractConstraint from './AbstractConstraint';
import { trim }           from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not a valid ISSN.';
const ISSN_LENGTH = 8;

export default class Issn extends AbstractConstraint {
    /**
     * @param {{message: string, trim: boolean, case_sensitive: boolean, hyphen: boolean}} [options]
     */
    constructor(options) {
        super(options);
    }

    /**
     * @return {{message: string, trim: boolean, case_sensitive: boolean, hyphen: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': false,
            'case_sensitive': false,
            'hyphen': false,
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
        if (typeof value !== 'string' || this.isEmptyValue(value)) {
            return undefined;
        }

        value = this.options.trim ? trim(value) : value;
        let canonical = value;

        if (canonical.length > 4 && canonical.charAt(4) === '-') {
            canonical = canonical.replace(/-/g, '');
        } else if (this.options.hyphen) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        if (canonical.length !== ISSN_LENGTH
            || this.options.case_sensitive && !/^\d{7}[X|0-9]$/.test(canonical)
            || !this.options.case_sensitive && !/^\d{7}[xX|0-9]$/.test(canonical)
        ) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        let sum = canonical.charAt(7) === 'x' || canonical.charAt(7) === 'X' ? 10 : parseInt(canonical.charAt(7));
        for (let i = 0; i < 7; ++i) {
            sum += (8 - i) * parseInt(canonical.charAt(i));
        }

        if (sum % 11 !== 0) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }

        return undefined;
    }
}
