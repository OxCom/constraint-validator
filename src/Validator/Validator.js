import {isArray}          from '../Utils/functions';
import AbstractConstraint from '../Constraints/AbstractConstraint';

export default class Validator {
    /**
     * Validates a value against a constraint or a list of constraints.
     *
     * @param value
     * @param {Array} constraints
     * @param {{form: Object}} [options]
     *
     * @return {Error[]}
     */
    validate(value, constraints, options = {}) {
        const errors = [];

        if (!isArray(constraints)) {
            return errors;
        }

        constraints.forEach((constraint) => {
            if (!(constraint instanceof AbstractConstraint)) {
                return false;
            }

            const error = constraint.validate(value, options);

            if (typeof error !== 'undefined') {
                errors.push(error);
            }
        });

        return errors;
    }
}
