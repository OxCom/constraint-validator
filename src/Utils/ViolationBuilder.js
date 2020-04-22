import {isArray, isFunction, isNull, isObject} from './functions';

export default class ViolationBuilder {
    constructor() {
        this.parameters = {};
    }

    /**
     * @param {String} name
     * @param value
     * @return {ViolationBuilder}
     */
    setParameter(name, value) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Invalid parameter name was provided: ' + JSON.stringify(name));
        }

        switch (true) {
            case typeof value === 'undefined':
                value = 'undefined';
                break;

            case isObject(value):
            case isArray(value):
                try {
                    value = JSON.stringify(value);
                } catch (e) {
                    value = value.toString();
                }
                break;

            case isNaN(value) && typeof value !== 'string':
                value = 'NaN';
                break;

            case isFunction(value):
                value = 'function() {}';
                break;

            case isNull(value):
                value = 'null';
                break;

            default:
                value = value + '';
        }

        this.parameters[`{{ ${name} }}`] = value.toString();

        return this;
    }

    /**
     * @param {string} message
     * @return {Error}
     */
    build(message) {
        if (typeof message !== 'string') {
            throw new Error('Invalid error message was provided.');
        }

        Object
            .keys(this.parameters)
            .forEach((key) => {
                message = message.replace(key, this.parameters[key]);
            });

        this.parameters = {};

        return Error(message);
    }
}
