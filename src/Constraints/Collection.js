import AbstractConstraint from './AbstractConstraint';
import {isObject}         from '../Utils/functions';
import Form               from '../Validator/Form';

const MESSAGE_EXTRA_FIELDS   = 'This collection element should not contain extra fields.';
const COLLECTION_ERROR_FILED = 'element';

export default class Collection extends AbstractConstraint {
    /**
     * @param {{fields: {}, allow_extra_fields: boolean, message_extra_fields: string,}} options
     */
    constructor(options = {}) {
        super(options);

        if (!this.options.fields || !isObject(this.options.fields)) {
            throw new Error(`Fields list should be type of "object", "${typeof this.options.fields}" given.`);
        }

        if (Object.keys(this.options.fields).length === 0) {
            throw new Error('Fields list is empty.');
        }
    }

    /**
     * @return {{fields: {}, allow_extra_fields: boolean, allow_missing_fields: boolean, message_extra_fields: string, message_missing_fields: string}}
     */
    getDefaultOptions() {
        return {
            'allow_extra_fields': false,
            'message_extra_fields': MESSAGE_EXTRA_FIELDS,
        };
    }

    /**
     * Get list of required properties
     *
     * @return {Array}
     */
    getRequiredOptions() {
        return ['fields'];
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

        // build form based on collection configuration
        const form = new Form({
            form_error_filed: COLLECTION_ERROR_FILED,
            extra_fields: this.options.allow_extra_fields,
            message_extra_fields: this.options.message_extra_fields,
        });

        if (options && options.form) {
            form.setParent(options.form);
        }

        Object.keys(this.options.fields).forEach(field => {
            form.add(field, this.options.fields[field], {form});
        });

        const collectionErrors = new Map();

        values.forEach((data, idx) => {
            const errors = form.validate(data);

            if (Object.keys(errors).length > 0) {
                collectionErrors.set(idx, errors);
            }
        });

        if (collectionErrors.size > 0) {
            return collectionErrors;
        }
    }
}
