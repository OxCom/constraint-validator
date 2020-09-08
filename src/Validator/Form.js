import {isArray, isFunction, pipe} from '../Utils/functions';
import ViolationBuilder            from '../Utils/ViolationBuilder';
import Validator             from './Validator';
import Field                 from './Field';

const FORM_ERROR_FIELD     = 'form';
const MESSAGE_EXTRA_FIELDS = 'This form should not contain extra fields.';

export default class Form {
    /**
     * @type {Validator}
     */
    validator;

    /**
     * @type {ViolationBuilder}
     */
    violationBuilder;

    /**
     * Added fields
     *
     * @type {{name: Field}}
     */
    fields = {};

    /**
     * Current form data
     *
     * @type {{}}
     */
    data = {};

    /**
     * Current errors
     *
     * @type {{}}
     */
    errors = {};

    /**
     * Form data transformers
     *
     * @type {function[]}
     */
    transformers = [];

    /**
     * Form data reverse transformers
     *
     * @type {function[]}
     */
    reversTransformers = [];

    /**
     * @param {{extra_fields: boolean, extra_fields_message: string}} [options]
     */
    constructor(options = {}) {
        this.options = {
            ...{
                // trigger error in form data contains fields that were not described in a form
                extra_fields: false,
                extra_fields_message: MESSAGE_EXTRA_FIELDS,
            },
            ...options
        };

        this.validator        = new Validator();
        this.violationBuilder = new ViolationBuilder();
    }

    /**
     * @param {string} field
     * @param {AbstractConstraint[]} [constants]
     * @param {Object} [options] Specific options for current field
     *
     * @return {Form}
     */
    add(field, constants, options = {}) {
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

        this.fields[field] = new Field(
            isArray(constants) ? constants : [],
            {...{}, ...options}
        );

        return this;
    }

    /**
     * Validate current form
     *
     * @param {{}} data
     * @param {{}} options
     * @return {{}}
     */
    validate(data = {}, options = {}) {
        this.errors = {};
        this.data   = data;

        if (!this.options.extra_fields) {
            this.checkExtraFields();
        }

        if (Object.keys(this.errors).length > 0) {
            return this.errors;
        }

        // run form transformers
        this.data = pipe(this.transformers)(this.data, options);

        Object.keys(this.fields).forEach((field) => {
            /** @type Field */
            const oField = this.fields[field];

            // pass custom validation options
            const vOptions = {
                ...options,
                ...{
                    field: oField.getOptions(),
                    form: this
                }
            };

            this.data[field] = pipe(oField.getTransformers())(this.data[field], vOptions);

            const errors = this.validator.validate(this.data[field], oField.getConstraints(), vOptions);

            if (errors.length > 0) {
                this.addValidationErrors(field, errors);
            }

            this.data[field] = pipe(oField.getReverseTransformers())(this.data[field], vOptions);
        });

        // run form reverse transformers
        this.data = pipe(this.reversTransformers)(this.data, options);

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

    /**
     * @return {{}}
     */
    getData() {
        return this.data;
    }

    /**
     * Add data transformer
     *
     * @param {function} transformer
     * @return {Form}
     */
    addTransformer(transformer) {
        if (!isFunction(transformer)) {
            throw new Error(`Transformer must be type of "function", ${typeof transformer} given.`);
        }

        this.transformers.push(transformer);

        return this;
    }

    /**
     * @param {string} name
     * @return {Field|undefined}
     */
    get(name) {
        if (!Object.keys(this.fields).includes(name)) {
            return;
        }

        return this.fields[name];
    }

    /**
     * Add reverse data transformer
     *
     * @param {function} transformer
     * @return {Form}
     */
    addReverseTransformer(transformer) {
        if (!isFunction(transformer)) {
            throw new Error(`Transformer must be type of "function", ${typeof transformer} given.`);
        }

        this.reversTransformers.push(transformer);

        return this;
    }

    /**
     * Remove all data transformers
     *
     * @return {Form}
     */
    resetTransformers() {
        this.transformers = [];

        return this;
    }

    /**
     * Remove all reverse data transformers
     *
     * @return {Form}
     */
    resetReverseTransformers() {
        this.reversTransformers = [];

        return this;
    }
}
