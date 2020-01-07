import AbstractConstraint          from './AbstractConstraint';
import { isNumeric, isDateObject } from '../Utils/functions';

const MESSAGE_MAX = 'This value should be {{ limit }} or less.';
const MESSAGE_MIN = 'This value should be {{ limit }} or more.';
const MESSAGE_INVALID = 'This value should be between {{ min }} and {{ max }}.';

export default class Range extends AbstractConstraint {
    /**
     * @param {{min: null, max: null, message_min: string, message_max: string, message: string}} options
     */
    constructor(options) {
        super(options);

        const hasMin = !(typeof this.options.min === 'undefined' || this.options.min === null);
        const hasMax = !(typeof this.options.max === 'undefined' || this.options.max === null);

        if (hasMin && !isNumeric(this.options.min) && !isDateObject(this.options.min)) {
            throw new Error(`Min limit should be type of "number" or "Date", "${typeof this.options.min}" given.`);
        }

        if (hasMax && !isNumeric(this.options.max) && !isDateObject(this.options.max)) {
            throw new Error(`Max limit should be type of "number" or "Date", "${typeof this.options.max}" given.`);
        }

        if (hasMin && hasMax) {
            if (isNumeric(this.options.min) && !isNumeric(this.options.max)) {
                throw new Error(`Max limit should be type of "number", "${typeof this.options.max}" given.`);
            }

            if (isDateObject(this.options.min) && !isDateObject(this.options.max)) {
                throw new Error(`Max limit should be type of "Date", "${typeof this.options.max}" given.`);
            }
        }

        this.options.min = isNumeric(this.options.min) ? parseFloat(this.options.min) : this.options.min;
        this.options.max = isNumeric(this.options.max) ? parseFloat(this.options.max) : this.options.max;
    }

    /**
     * @return {{message_min: string, message_max: string, message: string}}
     */
    getDefaultOptions() {
        return {
            'message_min': MESSAGE_MIN,
            'message_max': MESSAGE_MAX,
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        const reqMin = typeof this.options.min === 'undefined' || this.options.min === null;
        const reqMax = typeof this.options.max === 'undefined' || this.options.max === null;

        if (reqMin && reqMax) {
            return ['min', 'max'];
        }

        return [];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param {Number|Date} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (isDateObject(this.options.min) || isDateObject(this.options.max)) {
            value = value === 'now' ? new Date() : new Date(value);
        }

        const hasMin = !(typeof this.options.min === 'undefined' || this.options.min === null);
        const hasMax = !(typeof this.options.max === 'undefined' || this.options.max === null);

        if (this.isEmptyValue(value)
            || hasMin && hasMax && (value < this.options.min || value > this.options.max)
            || !isDateObject(this.options.min) && !isDateObject(this.options.max) && isDateObject(value)
        ) {
            return this
                .getViolationBuilder()
                .setParameter('min', isDateObject(this.options.min) ? this.formatDateValue(this.options.min) : this.options.min)
                .setParameter('max', isDateObject(this.options.max) ? this.formatDateValue(this.options.max) : this.options.max)
                .setParameter('value', isDateObject(value) ? this.formatDateValue(value) : value)
                .build(this.options.message);
        }

        if (hasMin && (value < this.options.min)) {
            return this
                .getViolationBuilder()
                .setParameter('limit', isDateObject(this.options.min) ? this.formatDateValue(this.options.min) : this.options.min)
                .setParameter('value', isDateObject(value) ? this.formatDateValue(value) : value)
                .build(this.options.message_min);
        }

        if (hasMax && (value > this.options.max)) {
            return this
                .getViolationBuilder()
                .setParameter('limit', isDateObject(this.options.max) ? this.formatDateValue(this.options.max) : this.options.max)
                .setParameter('value', isDateObject(value) ? this.formatDateValue(value) : value)
                .build(this.options.message_max);
        }

        return undefined;
    }
}
