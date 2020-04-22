import AbstractConstraint from './AbstractConstraint';
import {isFunction}       from '../Utils/functions';

const MESSAGE_INVALID = 'This value is not a valid.';

export default class Callback extends AbstractConstraint {
    /**
     * @param {{message: string, callback: function}} [options]
     */
    constructor(options = {}) {
        super(options);

        if (!isFunction(this.options.callback)) {
            throw new Error(`Value should be type of "function", "${typeof this.options.callback}" given.`);
        }
    }

    /**
     * @return {{message: string}}
     */
    getDefaultOptions() {
        return {
            'message': MESSAGE_INVALID,
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['callback'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     * @param {{form: Object}} options
     *
     * @return {Error|undefined}
     */
    validate(value, options = {}) {
        if (!this.options.callback(value, options)) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
