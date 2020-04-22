import AbstractConstraint from './AbstractConstraint';
import {isIterable}       from '../Utils/functions';

const MESSAGE_INVALID = 'Provided value should be countable, "{{ type }}" given.';
const MESSAGE_MAX     = 'This collection should contain {{ limit }} elements or less.';
const MESSAGE_MIN     = 'This collection should contain {{ limit }} elements or more.';
const MESSAGE_EXACT   = 'This collection should contain exactly {{ limit }} elements.';

export default class Count extends AbstractConstraint {
    /**
     * @param {{max: number, min: number, message_min: string, message_max: string, message_exact: string}} options
     */
    constructor(options = {}) {
        super(options);

        this.options.min = parseInt(this.options.min, 10);
        this.options.max = parseInt(this.options.max, 10);
    }

    /**
     * @return {{message_min: string, message_max: string, message_exact: string}}
     */
    getDefaultOptions() {
        return {
            'message_min': MESSAGE_MIN,
            'message_max': MESSAGE_MAX,
            'message_exact': MESSAGE_EXACT,
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
     * @param {object} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (!isIterable(value)) {
            return this
                .getViolationBuilder()
                .setParameter('type', typeof value)
                .build(MESSAGE_INVALID);
        }

        let length;

        switch (true) {
            // eslint-disable-next-line no-prototype-builtins
            case (value.hasOwnProperty('size') || value instanceof Map || value instanceof Set):
                length = value.size;
                break;

            case value instanceof ArrayBuffer:
                length = value.byteLength;
                break;

            default:
                length = value.length;
        }

        if (typeof length === 'undefined') {
            return this
                .getViolationBuilder()
                .setParameter('type', typeof value)
                .build(MESSAGE_INVALID);
        }

        if (this.options.min !== null && this.options.min === this.options.max && length !== this.options.max) {
            return this
                .getViolationBuilder()
                .setParameter('limit', this.options.max)
                .setParameter('value', value)
                .build(this.options.message_exact);
        }

        if (this.options.max !== null && length > this.options.max) {
            return this
                .getViolationBuilder()
                .setParameter('limit', this.options.max)
                .setParameter('value', value)
                .build(this.options.message_max);
        }

        if (this.options.min !== null && length < this.options.min) {
            return this
                .getViolationBuilder()
                .setParameter('limit', this.options.min)
                .setParameter('value', value)
                .build(this.options.message_min);
        }
    }
}
