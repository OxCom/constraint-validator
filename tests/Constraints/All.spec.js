import {All}               from '../../src/validator';
import Email               from '../../src/Constraints/Email';
import NotBlank            from '../../src/Constraints/NotBlank';

const assert = require('assert');

describe('All', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new All();
            } catch (e) {
                assert.strictEqual(e.message, 'No "constraints" option is configured.');
            }
        });

        it('configuration - empty constraints', function () {
            new All({
                constraints: [],
            });
        });

        it('fields configuration - valid', function () {
            new All({
                constraints: [new Email()],
            });
        });
    });

    describe('#validate()', function () {
        it('empty constraints - valid', function () {
            const object = new All({
                constraints: [],
            });

            const data = [
                'asd-1@qwe.ru',
                'asd-2@qwe.ru'
            ];

            const e = object.validate(data);

            assert.ok(typeof e === 'undefined', e);
        });

        it('constraints - valid', function () {
            const object = new All({
                constraints: [new NotBlank(), new Email()],
            });

            const data = [
                'asd-1@qwe.ru',
                'asd-2@qwe.ru'
            ];

            const e = object.validate(data);

            assert.ok(typeof e === 'undefined', e);
        });

        it('constraints with errors index - invalid', function () {
            const object = new All({
                constraints: [
                    new NotBlank(),
                    new Email()
                ],
            });

            const data = [
                '',
                'www@example.com',
                'aaaaaaa',
            ];

            const e = object.validate(data);

            assert.ok(e instanceof Map);
            assert.strictEqual(e.size, 2);
            assert.strictEqual(e.get(0)[0].message, 'This value should not be blank.');
            assert.ok(!e.get(1));
            assert.strictEqual(e.get(2)[0].message, 'This value is not valid email.');
        });
    });
});
