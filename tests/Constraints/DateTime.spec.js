import { DateTime } from '../../dist/validator';

const assert = require('assert');

describe('DateTime', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new DateTime();
        });

        it('Configuration with format', function () {
            new DateTime({
                'format': 'yyyy',
            });
        });
    });

    describe('#validate()', function () {
        it('Valid: 2015-11-28 / yyyy-MM-dd', function () {
            const object = new DateTime({format: 'yyyy-MM-dd'});
            const e = object.validate('2015-11-28');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: 11-28 / MM-dd', function () {
            const object = new DateTime({format: 'MM-dd'});
            const e = object.validate('11-28');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: 2015-11 / yyyy-MM', function () {
            const object = new DateTime({format: 'yyyy-MM'});
            const e = object.validate('2015-11');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: 2015-11-28 10:10 / yyyy-MM-dd HH:mm', function () {
            const object = new DateTime({format: 'yyyy-MM-dd HH:mm'});
            const e = object.validate('2015-11-28 10:10');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: 11/28/2015 10:10 / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate('11/28/2015 10:10');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: 10:10 / HH:mm', function () {
            const object = new DateTime({format: 'HH:mm'});
            const e = object.validate('10:10');

            assert.ok(typeof e === 'undefined', e);
        });

        it('Valid: Date object / yyyy-MM-dd HH:mm', function () {
            const object = new DateTime({format: 'yyyy-MM-dd HH:mm'});
            const e = object.validate(new Date());

            assert.ok(typeof e === 'undefined', e);
        });

        it('Invalid: 2015-11-28 10:10 / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate('2015-11-28 10:10');

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });

        it('Invalid: function() {} / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate(function () {
            });

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });

        it('Invalid: object / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate({a: 1});

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });

        it('Invalid: array / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate([]);

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });

        it('Invalid: boolean / MM/dd/yyyy HH:mm', function () {
            const object = new DateTime({format: 'MM/dd/yyyy HH:mm'});
            const e = object.validate(false);

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });

        it('Invalid: integer / yyyy', function () {
            const object = new DateTime({format: 'yyyy'});
            const e = object.validate(2015);

            assert.strictEqual(e.message, 'This value is not a valid datetime.');
        });
    });
});
