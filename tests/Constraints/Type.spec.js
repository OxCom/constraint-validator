import { Type } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Type', function () {
    const types = [
        {type: 'array', value1: ['a', 'b'], value2: 'array'},
        {type: 'date', value1: new Date(), value2: 'now'},
        {type: 'bool', value1: false, value2: 0},
        {type: 'boolean', value1: true, value2: 1},
        {type: 'function', value1: function() {}, value2: 'function'},
        {type: 'function', value1: function() {}, value2: Object.create(null)},
        {type: 'float', value1: 3.71, value2: 0},
        {type: 'float', value1: 0.0000001, value2: 1},
        {type: 'double', value1: 1 / 3, value2: '0.1'},
        {type: 'double', value1: -11.999999, value2: '3'},
        {type: 'int', value1: 0, value2: 1 / 3},
        {type: 'integer', value1: 7, value2: 'integer'},
        {type: 'null', value1: null, value2: 'null'},
        {type: 'null', value1: null, value2: 0},
        {type: 'null', value1: null, value2: ''},
        {type: 'numeric', value1: '123', value2: '12O'},
        {type: 'numeric', value1: 123, value2: ''},
        {type: 'numeric', value1: '012', value2: false},
        {type: 'object', value1: Object.create(null), value2: function() {}},
        {type: 'object', value1: {}, value2: []},
        {type: 'object', value1: {a: 1}, value2: null},
        {type: 'object', value1: {'a': 1}, value2: parseInt('a')},
        {type: 'string', value1: '', value2: parseInt('a')},
        {type: 'string', value1: 'string', value2: null},
        {type: 'string', value1: '0', value2: 0},
        // ctype_*
        {type: 'ctype_alnum', value1: '12a34', value2: '1a#23'},
        {type: 'ctype_digit', value1: '12345', value2: '12a34'},
        {type: 'ctype_alpha', value1: 'abcde', value2: 'abcd1'},
        {type: 'ctype_cntrl', value1: '\n\r\t', value2: '\nabc'},
        {type: 'ctype_graph', value1: 'arf12', value2: 'abc\n'},
        {type: 'ctype_lower', value1: 'abcde', value2: 'abCDE'},
        {type: 'ctype_upper', value1: 'ABCDE', value2: 'ABcde'},
        {type: 'ctype_print', value1: 'arf12', value2: '\nabc'},
        {type: 'ctype_punct', value1: '*&$()', value2: 'abc&$!'},
        {type: 'ctype_space', value1: '\n\r\t', value2: '\nabc'},
        {type: 'ctype_xdigit', value1: 'AB10BC99', value2: 'AR1012'},
    ];

    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Type();
            } catch (e) {
                assert.strictEqual(e.message, 'No "type" option is configured.');
            }
        });

        it('invalid type', function () {
            try {
                new Type({type: 'test'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid type provided: test');
            }
        });

        it('valid type', function () {
            types.forEach((t) => {
                try {
                    new Type({type: t.type});
                } catch (e) {
                    assert.ok(false, e.message);
                }
            });
        });
    });

    describe('Static properties', function() {
        it('Expose constant "TYPE_ARRAY"', function () {
            assert.strictEqual('array', Type.TYPE_ARRAY);
        });

        it('Expose constant "TYPE_DATE"', function () {
            assert.strictEqual('date', Type.TYPE_DATE);
        });

        it('Expose constant "TYPE_BOOL"', function () {
            assert.strictEqual('bool', Type.TYPE_BOOL);
        });

        it('Expose constant "TYPE_BOOLEAN"', function () {
            assert.strictEqual('boolean', Type.TYPE_BOOLEAN);
        });

        it('Expose constant "TYPE_FUNCTION"', function () {
            assert.strictEqual('function', Type.TYPE_FUNCTION);
        });

        it('Expose constant "TYPE_FLOAT"', function () {
            assert.strictEqual('float', Type.TYPE_FLOAT);
        });

        it('Expose constant "TYPE_DOUBLE"', function () {
            assert.strictEqual('double', Type.TYPE_DOUBLE);
        });

        it('Expose constant "TYPE_INT"', function () {
            assert.strictEqual('int', Type.TYPE_INT);
        });

        it('Expose constant "TYPE_INTEGER"', function () {
            assert.strictEqual('integer', Type.TYPE_INTEGER);
        });

        it('Expose constant "TYPE_NULL"', function () {
            assert.strictEqual('null', Type.TYPE_NULL);
        });

        it('Expose constant "TYPE_NUMERIC"', function () {
            assert.strictEqual('numeric', Type.TYPE_NUMERIC);
        });

        it('Expose constant "TYPE_OBJECT"', function () {
            assert.strictEqual('object', Type.TYPE_OBJECT);
        });

        it('Expose constant "TYPE_STRING"', function () {
            assert.strictEqual('string', Type.TYPE_STRING);
        });

        it('Expose constant "CTYPE_ALNUM"', function () {
            assert.strictEqual('ctype_alnum', Type.CTYPE_ALNUM);
        });

        it('Expose constant "CTYPE_ALPHA"', function () {
            assert.strictEqual('ctype_alpha', Type.CTYPE_ALPHA);
        });

        it('Expose constant "CTYPE_CNTRL"', function () {
            assert.strictEqual('ctype_cntrl', Type.CTYPE_CNTRL);
        });

        it('Expose constant "CTYPE_DIGIT"', function () {
            assert.strictEqual('ctype_digit', Type.CTYPE_DIGIT);
        });

        it('Expose constant "CTYPE_GRAPH"', function () {
            assert.strictEqual('ctype_graph', Type.CTYPE_GRAPH);
        });

        it('Expose constant "CTYPE_LOWER"', function () {
            assert.strictEqual('ctype_lower', Type.CTYPE_LOWER);
        });

        it('Expose constant "CTYPE_PRINT"', function () {
            assert.strictEqual('ctype_print', Type.CTYPE_PRINT);
        });

        it('Expose constant "CTYPE_PUNCT"', function () {
            assert.strictEqual('ctype_punct', Type.CTYPE_PUNCT);
        });

        it('Expose constant "CTYPE_SPACE"', function () {
            assert.strictEqual('ctype_space', Type.CTYPE_SPACE);
        });

        it('Expose constant "CTYPE_UPPER"', function () {
            assert.strictEqual('ctype_upper', Type.CTYPE_UPPER);
        });

        it('Expose constant "CTYPE_XDIGIT"', function () {
            assert.strictEqual('ctype_xdigit', Type.CTYPE_XDIGIT);
        });
    });

    describe('#validate()', function () {
        it('is valid', function () {
            types.forEach((t) => {
                const object = new Type({type: t.type});
                const e = object.validate(t.value1);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is not valid', function () {
            types.forEach((t) => {
                const object = new Type({type: t.type});
                const e = object.validate(t.value2);

                assert.strictEqual(e.message, `This value should be of type ${t.type}.`);
            });
        });
    });
});
