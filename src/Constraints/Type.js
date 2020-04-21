import {
    isArray, isBoolean, isDateObject, isFloat, isFunction, isInt,
    isNull, isNumeric, isObject, isString,
} from '../Utils/functions';
import AbstractConstraint from './AbstractConstraint';
import ctype_alnum from 'locutus/php/ctype/ctype_alnum';
import ctype_alpha from 'locutus/php/ctype/ctype_alpha';
import ctype_cntrl from 'locutus/php/ctype/ctype_cntrl';
import ctype_digit from 'locutus/php/ctype/ctype_digit';
import ctype_graph from 'locutus/php/ctype/ctype_graph';
import ctype_lower from 'locutus/php/ctype/ctype_lower';
import ctype_print from 'locutus/php/ctype/ctype_print';
import ctype_punct from 'locutus/php/ctype/ctype_punct';
import ctype_space from 'locutus/php/ctype/ctype_space';
import ctype_upper from 'locutus/php/ctype/ctype_upper';
import ctype_xdigit from 'locutus/php/ctype/ctype_xdigit';

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

const CTYPE_ALNUM = 'ctype_alnum';
const CTYPE_ALPHA = 'ctype_alpha';
const CTYPE_CNTRL = 'ctype_cntrl';
const CTYPE_DIGIT = 'ctype_digit';
const CTYPE_GRAPH = 'ctype_graph';
const CTYPE_LOWER = 'ctype_lower';
const CTYPE_PRINT = 'ctype_print';
const CTYPE_PUNCT = 'ctype_punct';
const CTYPE_SPACE = 'ctype_space';
const CTYPE_UPPER = 'ctype_upper';
const CTYPE_XDIGIT = 'ctype_xdigit';

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
            CTYPE_ALNUM, CTYPE_ALPHA, CTYPE_CNTRL, CTYPE_DIGIT, CTYPE_GRAPH,
            CTYPE_LOWER, CTYPE_PRINT, CTYPE_PUNCT, CTYPE_SPACE, CTYPE_UPPER,
            CTYPE_XDIGIT
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

            case CTYPE_ALNUM:
                result = ctype_alnum(value);
                break;

            case CTYPE_ALPHA:
                result = ctype_alpha(value);
                break;

            case CTYPE_CNTRL:
                result = ctype_cntrl(value);
                break;

            case CTYPE_DIGIT:
                result = ctype_digit(value);
                break;

            case CTYPE_GRAPH:
                result = ctype_graph(value);
                break;

            case CTYPE_LOWER:
                result = ctype_lower(value);
                break;

            case CTYPE_PRINT:
                result = ctype_print(value);
                break;

            case CTYPE_PUNCT:
                result = ctype_punct(value);
                break;

            case CTYPE_SPACE:
                result = ctype_space(value);
                break;

            case CTYPE_UPPER:
                result = ctype_upper(value);
                break;

            case CTYPE_XDIGIT:
                result = ctype_xdigit(value);
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

    static get CTYPE_ALNUM() {
        return CTYPE_ALNUM;
    }

    static get CTYPE_ALPHA() {
        return CTYPE_ALPHA;
    }

    static get CTYPE_CNTRL() {
        return CTYPE_CNTRL;
    }

    static get CTYPE_DIGIT() {
        return CTYPE_DIGIT;
    }

    static get CTYPE_GRAPH() {
        return CTYPE_GRAPH;
    }

    static get CTYPE_LOWER() {
        return CTYPE_LOWER;
    }

    static get CTYPE_PRINT() {
        return CTYPE_PRINT;
    }

    static get CTYPE_PUNCT() {
        return CTYPE_PUNCT;
    }

    static get CTYPE_SPACE() {
        return CTYPE_SPACE;
    }

    static get CTYPE_UPPER() {
        return CTYPE_UPPER;
    }

    static get CTYPE_XDIGIT() {
        return CTYPE_XDIGIT;
    }
}
