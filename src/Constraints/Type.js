import {
    isArray,
    isBoolean,
    isDateObject,
    isFloat,
    isFunction,
    isInt,
    isNull,
    isNumeric,
    isObject, isString,
}                         from '../Utils/functions';
import AbstractConstraint from './AbstractConstraint';

const MESSAGE_INVALID = 'This value should be of type {{ type }}.';

const TYPE_ARRAY = 'array';
const TYPE_DATE = 'date';
const TYPE_BOOL = 'bool';
const TYPE_BOOLEAN = 'boolean';
const TYPE_FUNCTION = 'function';
const TYPE_FLOAT = 'float';
const TYPE_DOUBLE = 'double';
const TYPE_INT = 'int';
const TYPE_INTEGER = 'integer';
const TYPE_NULL = 'null';
const TYPE_NUMERIC = 'numeric';
const TYPE_OBJECT = 'object';
const TYPE_STRING = 'string';

export default class Type extends AbstractConstraint {
    /**
     * @param {{type: string, message: string}} [options]
     */
    constructor(options) {
        super(options);

        const allowed = [
            TYPE_ARRAY, TYPE_DATE, TYPE_BOOL, TYPE_BOOLEAN, TYPE_FUNCTION, TYPE_FLOAT,
            TYPE_INTEGER, TYPE_NULL, TYPE_NUMERIC, TYPE_OBJECT, TYPE_STRING,
            TYPE_DOUBLE, TYPE_INT,
        ];

        if (!allowed.includes(this.options.type)) {
            throw new Error(`Invalid type provided: ${this.options.type}`);
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
        return ['type'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param {String} value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        let result = false;

        switch (this.options.type) {
            case TYPE_ARRAY:
                result = isArray(value);
                break;

            case TYPE_DATE:
                result = isDateObject(value);
                break;

            case TYPE_BOOL:
            case TYPE_BOOLEAN:
                result = isBoolean(value);
                break;

            case TYPE_FUNCTION:
                result = isFunction(value);
                break;

            case TYPE_FLOAT:
            case TYPE_DOUBLE:
                result = isFloat(value);
                break;

            case TYPE_INT:
            case TYPE_INTEGER:
                result = isInt(value);
                break;

            case TYPE_NULL:
                result = isNull(value);
                break;

            case TYPE_NUMERIC:
                result = isNumeric(value);
                break;

            case TYPE_OBJECT:
                result = isObject(value);
                break;

            case TYPE_STRING:
                result = isString(value);
                break;
        }

        if (result) {
            return;
        }

        return this
            .getViolationBuilder()
            .setParameter('value', value)
            .setParameter('type', this.options.type)
            .build(this.options.message);
    }

    static get TYPE_ARRAY() {
        return TYPE_ARRAY;
    }

    static get TYPE_DATE() {
        return TYPE_DATE;
    }

    static get TYPE_BOOL() {
        return TYPE_BOOL;
    }

    static get TYPE_BOOLEAN() {
        return TYPE_BOOLEAN;
    }

    static get TYPE_FUNCTION() {
        return TYPE_FUNCTION;
    }

    static get TYPE_FLOAT() {
        return TYPE_FLOAT;
    }

    static get TYPE_DOUBLE() {
        return TYPE_DOUBLE;
    }

    static get TYPE_INT() {
        return TYPE_INT;
    }

    static get TYPE_INTEGER() {
        return TYPE_INTEGER;
    }

    static get TYPE_NULL() {
        return TYPE_NULL;
    }

    static get TYPE_NUMERIC() {
        return TYPE_NUMERIC;
    }

    static get TYPE_OBJECT() {
        return TYPE_OBJECT;
    }

    static get TYPE_STRING() {
        return TYPE_STRING;
    }
}
