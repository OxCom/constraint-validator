import ViolationBuilder from '../../src/Utils/ViolationBuilder';

const assert = require('assert');

describe('Utils/ViolationBuilder', function () {
    describe('#constructor()', function () {
        it('empty message template provided', function () {
            const object = new ViolationBuilder();
            [undefined, 1, {}, [], true, false, null, function () {
            }, parseInt('a')]
                .forEach(function (value) {
                    try {
                        object.build(value);
                        assert.fail('Expected of configuration error.');
                    } catch (e) {
                        assert.strictEqual(e.message, 'Invalid error message was provided.');
                    }
                });
        });

        it('message with template variables', function () {
            const object = new ViolationBuilder();
            try {
                object.build('This is {{ var1 }} message {{ var2 }}');
            } catch (e) {
                assert.fail(e.message);
            }
        });
    });

    describe('#setParameter()', function () {
        it('invalid parameter name provided', function () {
            [undefined, 1, {}, [], true, false, null, function () {
            }, parseInt('a'), '']
                .forEach(function (key) {
                    try {
                        const object = new ViolationBuilder('This is {{ var1 }} message {{ var2 }}');

                        object.setParameter(key, 'value');
                        assert.fail('Expected that parameter name is invalid: ' + JSON.stringify(key));
                    } catch (e) {
                        assert.strictEqual(e.message, 'Invalid parameter name was provided: ' + JSON.stringify(key));
                    }
                });
        });

        it('valid parameter value provided', function () {
            const object = new ViolationBuilder('This is {{ var1 }} message {{ var2 }}');

            object.setParameter('var1', 'value');
        });

        it('valid parameter value provided', function () {
            ['value1', undefined, {}, [], null, true, false, parseInt('a'), function () {
            }, 1, 1.1]
                .forEach((value) => {
                    const object = new ViolationBuilder('This is {{ var1 }} message {{ var2 }}');

                    object.setParameter('var1', value);
                });
        });
    });

    describe('#trigger()', function () {
        it('Check parameter injection', function () {
            const object = new ViolationBuilder();

            const e = object
                .setParameter('var1', 'value1')
                .setParameter('var2', 'value2')
                .build('This is {{ var1 }} message {{ var2 }} and var1 plus var2');

            assert.strictEqual(e.message, 'This is value1 message value2 and var1 plus var2');
        });
    });
});
