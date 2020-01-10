import AbstractConstraint           from './AbstractConstraint';
import { isNumeric } from '../Utils/functions';

const MESSAGE_INVALID = 'This value should be a multiple of {{ compared_value }}.';
const MESSAGE_INVALID_TYPE = 'This values has different types. Given type is "{{ current_type }}"; Expected type is "{{ expected_type }}".';

export default class DivisibleBy extends AbstractConstraint {
    /**
     * @param {{message: string, message_type: string, value: number}} [options]
     */
    constructor(options) {
        super(options);

        if (!this.options.value || !isNumeric(this.options.value)) {
            throw new Error(`Value should be type of "number", "${typeof this.options.value}" given.`);
        }
    }

    /**
     * @link https://momentjs.com/docs/#/parsing/string-format/
     *
     * @return {{message: string, message_type: string}}
     */
    getDefaultOptions() {
        return {
            'message': MESSAGE_INVALID,
            'message_type': MESSAGE_INVALID_TYPE,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['value'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (!isNumeric(value) || isNaN(value)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .setParameter('compared_value', this.options.value)
                .setParameter('current_type', typeof value)
                .setParameter('expected_type', 'number')
                .build(this.options.message_type);
        }

        if (value % this.options.value !== 0) {
            return this
                .getViolationBuilder()
                .setParameter('compared_value', this.options.value)
                .setParameter('value', value)
                .build(this.options.message);
        }

        return;
    }
}
