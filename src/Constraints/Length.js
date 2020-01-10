import AbstractConstraint from './AbstractConstraint';
import { trim }           from '../Utils/functions';

const MESSAGE_MAX = 'This value is too long. It should have {{ limit }} character(s) or less.';
const MESSAGE_MIN = 'This value is too short. It should have {{ limit }} character(s) or more.';
const MESSAGE_EXACT = 'This value should have exactly {{ limit }} character(s).';

export default class Length extends AbstractConstraint {
    /**
     * @param {{min: number, max: number, message_min: string, message_max: string, message_exact: string, trim: boolean}} options
     */
    constructor(options) {
        super(options);

        this.options.min = parseInt(this.options.min, 10);
        this.options.max = parseInt(this.options.max, 10);
    }

    /**
     * @return {{message_min: string, message_max: string, message_exact: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
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
     * @param {String} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (typeof value !== 'string') {
            return;
        }

        const length = value.length;

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

        return;
    }
}
