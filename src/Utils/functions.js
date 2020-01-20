import is_numeric  from 'locutus/php/var/is_numeric';
import is_float    from 'locutus/php/var/is_float';
import is_int      from 'locutus/php/var/is_int';
import php_trim    from 'locutus/php/strings/trim';
import ctype_alnum from 'locutus/php/ctype/ctype_alnum';

/**
 * @param object
 * @return {boolean}
 */
export function isNumeric(object) {
    return is_numeric(object);
}

/**
 * @param object
 * @return {boolean}
 */
export function isDateObject(object) {
    return Object.prototype.toString.call(object) === '[object Date]' && object instanceof Date;
}

/**
 * @param object
 * @return {boolean}
 */
export function isNull(object) {
    return object === null;
}

/**
 * @param object
 * @return {boolean}
 */
export function isArray(object) {
    return Array.isArray(object);
}

/**
 * @param object
 * @return {boolean}
 */
export function isBoolean(object) {
    return object === true || object === false;
}

/**
 * @param object
 * @return {boolean}
 */
export function isFunction(object) {
    return typeof (object) === 'function';
}

/**
 *
 * @param object
 * @return {boolean|boolean}
 */
export function isFloat(object) {
    return is_float(object);
}

/**
 * @param object
 * @return {boolean}
 */
export function isInt(object) {
    return is_int(object);
}

/**
 * @param object
 * @return {boolean}
 */
export function isObject(object) {
    if (Object.prototype.toString.call(object) === '[object Array]' || object === null) {
        return false;
    }

    return typeof object === 'object' && object === Object(object);
}

/**
 * @param object
 * @return {boolean}
 */
export function isString(object) {
    return (typeof object === 'string');
}

/**
 * @param object
 * @return {boolean}
 */
export function isIterable(object) {
    if (typeof object === 'undefined' || object === null || isString(object)) {
        return false;
    }

    return isArray(object)
           || object instanceof Int8Array
           || object instanceof Uint8Array
           || object instanceof Uint8ClampedArray
           || object instanceof Int16Array
           || object instanceof Uint16Array
           || object instanceof Int32Array
           || object instanceof Uint32Array
           || object instanceof Float32Array
           || object instanceof Float64Array
           // || object instanceof BigInt64Array
           // || object instanceof BigUint64Array
           || object instanceof Map
           || object instanceof Set
           || object instanceof WeakMap
           || object instanceof WeakSet
           || object instanceof ArrayBuffer;
}

/**
 * @param {string} value
 * @return {string}
 */
export function trim(value) {
    if (typeof value !== 'string') {
        return value;
    }

    const ws = [
        ' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004',
        '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000',
        '\x00',
    ].join('');

    return php_trim(value, ws);
}
