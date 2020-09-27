import ViolationBuilder from '../Utils/ViolationBuilder';
import LocaleDetector   from '../Utils/LocaleDetector';

const detector = new LocaleDetector();

export default class AbstractConstraint {
    /**
     * @param {{locale_string: string, locale_options: object}} options
     */
    constructor(options = {}) {
        this.options = {
            ...this.getDefaultOptions(),
            ...options,
        };

        this.getRequiredOptions()
            .forEach((key) => {
                if (typeof this.options[key] === 'undefined') {
                    throw new Error(`No "${key}" option is configured.`);
                }
            });

        // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        this.locale_string  = this.options.locale_string || detector.getUserLocale();
        this.locale_options = this.options.locale_options || {};

        this.violationBuilder = new ViolationBuilder();
    }

    /**
     * Get default configuration options
     *
     * @return {{}}
     */
    getDefaultOptions() {
        return {};
    }

    /**
     * Get list of required properties
     *
     * @return {string[]}
     */
    getRequiredOptions() {
        return [];
    }

    /**
     * @return {ViolationBuilder}
     */
    getViolationBuilder() {
        return this.violationBuilder;
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     * @param {{form: Form}} options
     *
     * @return {Error|undefined}
     */
    // eslint-disable-next-line no-unused-vars
    validate(value, options) {
        throw new Error('The validate() method was not implemented');
    }

    /**
     * The null, NaN, undefined and empty strings are considered empty values.
     *
     * @param value
     *
     * @return {boolean}
     */
    isEmptyValue(value) {
        return typeof value === 'string' && value.length === 0
            || typeof value !== 'string' && typeof value !== 'object' && typeof value !== 'function' && isNaN(value)
            || value === null
            || typeof value === 'undefined';
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     *
     * @return {String}
     */
    formatDateValue(date) {
        return new Intl.DateTimeFormat(this.locale_string, this.locale_options).format(date);
    }
}
