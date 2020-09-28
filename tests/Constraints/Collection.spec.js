import {Collection} from '../../src/validator';
import Email        from '../../src/Constraints/Email';
import NotBlank     from '../../src/Constraints/NotBlank';

const assert = require('assert');

describe('Constraints/Collection', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Collection();
            } catch (e) {
                assert.strictEqual(e.message, 'No "fields" option is configured.');
            }
        });

        it('fields configuration - empty fields', function () {
            try {
                new Collection({
                    fields: {},
                });

                assert.fail('Empty fields list should trigger error.');
            } catch (e) {
                assert.strictEqual(e.message, 'Fields list is empty.');
            }
        });

        it('fields configuration - valid', function () {
            new Collection({
                fields: {
                    email: [],
                },
            });
        });
    });

    describe('#validate()', function () {
        it('empty constraints - valid', function () {
            const object = new Collection({
                fields: {
                    email: [],
                },
            });

            const data = [
                {email: 'asd@qwe.ru'},
                {email: 'asd@qwe.ru'}
            ];

            const e = object.validate(data);

            assert.ok(typeof e === 'undefined', e);
        });

        it('constraints - valid', function () {
            const object = new Collection({
                fields: {
                    email: [
                        new Email()
                    ],
                },
            });

            const data = [
                {email: 'asd@qwe.ru'},
                {email: 'asd@qwe.ru'}
            ];

            const e = object.validate(data);

            assert.ok(typeof e === 'undefined', e);
        });

        it('constraints with errors index - invalid', function () {
            const object = new Collection({
                fields: {
                    email: [
                        new NotBlank(),
                        new Email()
                    ],
                },
            });

            const data = [
                {email: ''},
                {email: 'www@example.com'},
                {email: 'aaaaaaaaaaa'}
            ];

            const e = object.validate(data);

            assert.ok(e instanceof Map);
            assert.strictEqual(e.size, 2);
            assert.strictEqual(e.get(0).email[0].message, 'This value should not be blank.');
            assert.ok(!e.has(1));
            assert.strictEqual(e.get(2).email[0].message, 'This value is not valid email.');
        });

        it('extra fields not allowed - invalid', function () {
            const object = new Collection({
                fields: {
                    email: [
                        new NotBlank(),
                        new Email()
                    ],
                },
            });

            const data = [
                {email: 'qwe@qwe.ru', hello: 'world',},
                {email: 'qwe@qwe.ru'}
            ];

            const e = object.validate(data);
            assert.ok(e instanceof Map);
            assert.strictEqual(e.size, 1);
            assert.strictEqual(e.get(0).element[0].message, 'This collection element should not contain extra fields.');
        });

        it('extra fields allowed - invalid', function () {
            const object = new Collection({
                allow_extra_fields: true,
                fields: {
                    email: [
                        new NotBlank(),
                        new Email()
                    ],
                },
            });

            const data = [
                {email: 'qwe@qwe.ru', hello: 'world',},
                {email: 'qwe@qwe.ru'}
            ];

            const e = object.validate(data);

            assert.ok(typeof e === 'undefined', e);
        });
    });
});
