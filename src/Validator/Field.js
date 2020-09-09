import {isFunction} from '../Utils/functions';

export default class Field {
    /**
     * List of the assigned constraints
     *
     * @type {AbstractConstraint[]}
     */
    constraints = [];

    /**
     * Filed configuration
     *
     * @type {{map_name: string}}
     */
    options = {};

    /**
     * Data transformers
     *
     * @type {function[]}
     */
    transformers = [];

    /**
     * Data reverse transformers
     *
     * @type {function[]}
     */
    reversTransformers = [];

    /**
     * @param {AbstractConstraint[]} [constants]
     * @param {{map_name: string}} [options]
     */
    constructor(constants = [], options = {}) {
        this.constraints = constants;
        this.options     = options;
    }

    /**
     * Map field name if configured
     *
     * @param {string} name
     * @return {string}
     */
    getMappedFieldName(name) {
        return typeof this.options.map_name === 'string' && this.options.map_name.length > 0
            ? this.options.map_name
            : name;
    }

    /**
     * @return {AbstractConstraint[]}
     */
    getConstraints() {
        return this.constraints;
    }

    /**
     * @return {{}}
     */
    getOptions() {
        return this.options;
    }

    /**
     * @return {Function[]}
     */
    getTransformers() {
        return this.transformers;
    }

    /**
     * @return {Function[]}
     */
    getReverseTransformers() {
        return this.reversTransformers;
    }

    /**
     * Add data transformer
     *
     * @param {function} transformer
     * @return {Field}
     */
    addTransformer(transformer) {
        if (!isFunction(transformer)) {
            throw new Error(`Transformer must be type of "function", ${typeof transformer} given.`);
        }

        this.transformers.push(transformer);

        return this;
    }

    /**
     * Add reverse data transformer
     *
     * @param {function} transformer
     * @return {Field}
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
     * @return {Field}
     */
    resetTransformers() {
        this.transformers = [];

        return this;
    }

    /**
     * Remove all reverse data transformers
     *
     * @return {Field}
     */
    resetReverseTransformers() {
        this.reversTransformers = [];

        return this;
    }
}
