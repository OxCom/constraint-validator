import {isArray}          from '../Utils/functions';
import AbstractConstraint from '../Constraints/AbstractConstraint';
import Collection         from '../Constraints/Collection';

export default class Validator {
    /**
     * Validates a value against a constraint or a list of constraints.
     *
     * @param value
     * @param {AbstractConstraint[]|Collection} constraints
     * @param {{form: Object, field: Object}} [options]
     *
     * @return {Error[]}
     */
    validate(value, constraints, options = {}) {
        const errors = [];

        if (constraints instanceof Collection) {
            return constraints.validate(value, options);
        }

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
