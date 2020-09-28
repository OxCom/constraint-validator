import AbstractConstraint from './AbstractConstraint';
import {isArray}          from '../Utils/functions';
import Validator          from '../Validator/Validator';

export default class All extends AbstractConstraint {
    /**
     * @param {{constraints: AbstractConstraint[]}} options
     */
    constructor(options = {}) {
        super(options);

        if (!this.options.constraints || !isArray(this.options.constraints)) {
            throw new Error(`Fields list should be type of "array", "${typeof this.options.constraints}" given.`);
        }
    }

    /**
     * Get list of required properties
     *
     * @return {Array}
     */
    getRequiredOptions() {
        return ['constraints'];
    }

    /**
     * @param {object} values
     * @param {{form: Form}} options
     *
     * @return {Map|undefined}
     */
    validate(values, options) {
        if (!Array.isArray(values)) {
            return;
        }

        const validator = new Validator();
        const allErrors = new Map();

        values.forEach((value, idx) => {
            const errors = validator.validate(value, this.options.constraints, options);

            if (errors.length > 0 || errors.size > 0) {
                allErrors.set(idx, errors);
            }
        });

        if (allErrors.size > 0) {
            return allErrors;
        }
    }
}
