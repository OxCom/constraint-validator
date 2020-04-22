import AbstractConstraint from './AbstractConstraint';
import {isDateObject}     from '../Utils/functions';

const MESSAGE_STRICT = 'This values has different types. Given type is {{ value_type }}; Expected type is {{ compared_type }}.';

export default class AbstractCompareConstraint extends AbstractConstraint {
    /**
     * @param {{value: null, message_strict: string, strict: boolean, locale_string: string, locale_options: object}} options
     */
    constructor(options = {}) {
        super(options);

        this.options.strict = !!this.options.strict;
    }

    /**
     * @return {{message_strict: string}}
     */
    getDefaultOptions() {
        return {
            'strict': false,
            'message_strict': MESSAGE_STRICT,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['value', 'strict'];
    }

    /**
     * @param value1
     * @param value2
     *
     * @return {boolean}
     */
    // eslint-disable-next-line no-unused-vars
    compare(value1, value2) {
        throw new Error('The compare() method was not implemented');
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param {String} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        let compareValue = this.options.value;

        if (this.options.strict && typeof compareValue !== typeof value) {
            return this
                .getViolationBuilder()
                .setParameter('value_type', isDateObject(value) ? 'Date object' : typeof value)
                .setParameter('compared_type', isDateObject(compareValue) ? 'Date object' : typeof compareValue)
                .build(this.options.message_strict);
        }

        if (isDateObject(compareValue)) {
            // Convert strings to Date if comparing another Date
            // This allows to compare with any date/time value supported by
            // the Date constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
            value = value === 'now' ? new Date() : new Date(value);
        }

        if (!this.compare(value, compareValue)) {
            value        = isDateObject(value) ? this.formatDateValue(value) : value;
            compareValue = isDateObject(compareValue) ? this.formatDateValue(compareValue) : compareValue;

            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .setParameter('compared_value', compareValue)
                .setParameter('compared_value_type', typeof compareValue)
                .build(this.options.message);
        }
    }
}
