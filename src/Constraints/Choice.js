import AbstractConstraint from './AbstractConstraint';
import {isArray}          from '../Utils/functions';

const MESSAGE_INVALID  = 'The value you selected is not a valid choice.';
const MESSAGE_MIN      = 'You must select at least {{ limit }} choices.';
const MESSAGE_MAX      = 'You must select at most {{ limit }} choices.';
const MESSAGE_MULTIPLE = 'One or more of the given values is invalid.';

export default class Choice extends AbstractConstraint {
    /**
     * @param {{message: string, multiple: boolean, min: int, max: int, choices: array, message_min: string, message_max: string, message_multiple: string}} [options]
     */
    constructor(options = {}) {
        super(options);

        if (!this.options.choices || !isArray(this.options.choices)) {
            throw new Error(`Choices list should be type of "array", "${typeof this.options.choices}" given.`);
        }

        if (this.options.min || this.options.max) {
            this.options.multiple = true;
        }
    }

    /**
     * @return {{message: string, multiple: boolean, min: int, max: int, choices: array, message_min: string, message_max: string, message_multiple: string}}
     */
    getDefaultOptions() {
        return {
            'multiple': false,
            'min': 0,
            'max': 0,
            'message': MESSAGE_INVALID,
            'message_min': MESSAGE_MIN,
            'message_max': MESSAGE_MAX,
            'message_multiple': MESSAGE_MULTIPLE,
        };
    }

    /**
     * Get list of required properties
     *
     * @return {Array}
     */
    getRequiredOptions() {
        return ['choices'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.min > 0 && value.length < this.options.min) {
            return this
                .getViolationBuilder()
                .setParameter('limit', this.options.min)
                .setParameter('value', value)
                .setParameter('choices', this.options.choices.join(', '))
                .build(this.options.message_min);
        }

        if (this.options.max > 0 && value.length > this.options.max) {
            return this
                .getViolationBuilder()
                .setParameter('limit', this.options.max)
                .setParameter('value', value)
                .setParameter('choices', this.options.choices.join(', '))
                .build(this.options.message_max);
        }

        if (this.options.multiple) {
            for (let i = 0; i < value.length; i++) {
                if (!this.options.choices.includes(value[i])) {
                    return this
                        .getViolationBuilder()
                        .setParameter('value', value)
                        .setParameter('choices', this.options.choices.join(', '))
                        .build(this.options.message_multiple);
                }
            }
        } else if (!this.options.choices.includes(value)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .setParameter('choices', this.options.choices.join(', '))
                .build(this.options.message);
        }
    }
}
