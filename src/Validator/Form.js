import { isArray }      from '../Utils/functions';
import ViolationBuilder from '../Utils/ViolationBuilder';
import Validator        from './Validator';

const FORM_ERROR_FIELD = 'form';
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
        this.errors = {};
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
        this.errors = {};
        this.data = data;

        if (!this.options.extra_fields) {
            this.checkExtraFields();
        }

        if (Object.keys(this.errors).length > 0) {
            return this.errors;
        }

        Object.keys(this.fields).forEach((field) => {
            const value = this.data[field];
            const errors = this.validator.validate(value, this.fields[field].constants, {form: this});

            if (errors.length > 0) {
                this.addValidationErrors(field, errors);
            }
        });

        return this.errors;
    }

    /**
     * @param {string} field
     * @param {Error|Error[]} error
     * @return {Form}
     */
    addValidationErrors(field, error) {
        if (!isArray(this.errors[field])) {
            this.errors[field] = [];
        }

        if (isArray(error)) {
            this.errors[field] = this.errors[field].concat(error);
        } else {
            this.errors[field].push(error);
        }

        return this;
    }

    /**
     * @return {Form}
     */
    checkExtraFields() {
        for (const field of Object.keys(this.data)) {
            if (typeof this.fields[field] === 'undefined') {
                this.addValidationErrors(
                    FORM_ERROR_FIELD,
                    this.violationBuilder.build(this.options.extra_fields_message)
                );

                break;
            }
        }

        return this;
    }

    getData() {
        return this.data;
    }
}
