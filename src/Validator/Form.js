import { isArray }      from '../Utils/functions';
import ViolationBuilder from '../Utils/ViolationBuilder';
import Validator        from './Validator';

const MESSAGE_EXTRA_FIELDS = 'This form should not contain extra fields.';

export default class Form {
    /**
     * @param {{extra_fields: boolean}} [options]
     */
    constructor(options) {
        this.options = {
            ...{
                // trigger error in form data contains fields that were not described in a form
                extra_fields: false,
                extra_fields_message: MESSAGE_EXTRA_FIELDS,
            },
            ...options
        };

        this.validator = new Validator();
        this.violationBuilder = new ViolationBuilder();
        this.fields = {};
        this.data = {};
    }

    /**
     * @param {string} field
     * @param {AbstractConstraint[]} [constants]
     * @param {Object} [options] - not in use
     *
     * @return {Form}
     */
    add(field, constants, options) {
        if (typeof field !== 'string') {
            throw new Error(`The field should be type of "string", "${typeof field}" given.`);
        }

        if (field.length === 0) {
            throw new Error('The field name is too short.');
        }

        if (typeof constants !== 'undefined' && !isArray(constants)) {
            throw new Error(`The constants should be type of "array", "${typeof constants}" given.`);
        }

        if (typeof this.fields[field] !== 'undefined') {
            throw new Error(`The field ${field} already exists in this form.`);
        }

        this.fields[field] = {
            constants: isArray(constants) ? constants : [],
            options: {
                ...{},
                options,
            },
        };

        return this;
    }

    /**
     * @param {Object} data
     *
     * @return {Array}
     */
    validate(data) {
        const errors = {};

        this.data = data;

        if (!this.options.extra_fields) {
            let extra = this.hasExtraFields(data);
            if (extra) {
                errors['form'] = [extra];
            }
        }

        if (Object.keys(errors).length > 0) {
            return errors;
        }

        Object.keys(data).forEach((field) => {
            const value = data[field];

            if (typeof this.fields[field] === 'undefined') {
                return true;
            }

            const fieldErrors = this.validator.validate(value, this.fields[field].constants, {form: this});

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        });

        return errors;
    }

    /**
     * @param {Object} data
     * @return {Error|undefined}
     */
    hasExtraFields(data) {
        for (const field of Object.keys(data)) {
            if (typeof this.fields[field] === 'undefined') {
                return this.violationBuilder.build(this.options.extra_fields_message);
            }
        }

        return;
    }

    getData() {
        return this.data;
    }
}
