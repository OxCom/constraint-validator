import { Isbn } from '../../src/validator';

const assert = require('assert');

describe('Constraints/Isbn', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Isbn();
        });

        it('invalid mode configured', function () {
            try {
                new Isbn({mode: 'ASD'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid validation mode provided: ASD');
            }
        });

        it('valid mode configured', function () {
            new Isbn({mode: 'isbn10'});
            new Isbn({mode: 'ISBN10'});
        });
    });

    describe('Static properties', function() {
        it('Expose constant "MODE_ALL"', function () {
            assert.strictEqual(null, Isbn.MODE_ALL);
        });

        it('Expose constant "MODE_ISBN_10"', function () {
            assert.strictEqual('isbn10', Isbn.MODE_ISBN_10);
        });

        it('Expose constant "MODE_ISBN_13"', function () {
            assert.strictEqual('isbn13', Isbn.MODE_ISBN_13);
        });
    });

    describe('#validate()', function () {
        it('is valid - empty', function () {
            let object = new Isbn();

            [null, undefined, ''].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is valid: mode = null', function () {
            let object = new Isbn();

            [
                // isbn10
                '2723442284',
                '2723442276',
                '2723455041',
                '2070546810',
                '2711858839',
                '2756406767',
                '2870971648',
                '226623854X',
                '2851806424',
                '0321812700',
                '0-45122-5244',
                '0-4712-92311',
                '0-9752298-0-X',

                // isbn13
                '9782723442282',
                '978-2723442282',
                '978-2723442275',
                '978-2723455046',
                '978-2070546817',
                '978-2711858835',
                '978-2756406763',
                '978-2870971642',
                '978-2266238540',
                '978-2851806420',
                '978-0321812704',
                '978-0451225245',
                '978-0471292319',

            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is invalid: mode = null', function () {
            let object = new Isbn();

            [
                [], {}, function() {},
                '272_3442276',
                '272X455041',
                '207-0546-X10',
                '2711858839Q',
                '2756406767X',
                '978-27234422821',
                '978-272344228',
                '978-2723442-82',
                '978-2723442281',
                '978-0321513774',
                '979-0431225385',
                '980-0474292319',
                '0-4X19-92619812',
                '978_2723442282',
                '978#2723442282',
                '978-272C442282',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is neither a valid ISBN-10 nor a valid ISBN-13.');
            });
        });

        it('is valid: mode = isbn10', function () {
            let object = new Isbn({mode: Isbn.MODE_ISBN_10});

            [
                // isbn10
                '2723442284',
                '2723442276',
                '2723455041',
                '2070546810',
                '2711858839',
                '2756406767',
                '2870971648',
                '226623854X',
                '2851806424',
                '0321812700',
                '0-45122-5244',
                '0-4712-92311',
                '0-9752298-0-X',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is invalid: mode = isbn10', function () {
            let object = new Isbn({mode: Isbn.MODE_ISBN_10});

            [
                '272_3442276',
                '272X455041',
                '207-0546-X10',
                '2711858839Q',
                '2756406767X',
                '978-27234422821',
                '978-272344228',
                '978-2723442-82',
                '978-2723442281',
                '978-0321513774',
                '979-0431225385',
                '980-0474292319',
                '0-4X19-92619812',
                '978_2723442282',
                '978#2723442282',
                '978-272C442282',

                // valid isbn13
                '9782723442282',
                '978-2723442282',
                '978-2723442275',
                '978-2723455046',
                '978-2070546817',
                '978-2711858835',
                '978-2756406763',
                '978-2870971642',
                '978-2266238540',
                '978-2851806420',
                '978-0321812704',
                '978-0451225245',
                '978-0471292319',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not a valid ISBN-10.');
            });
        });

        it('is valid: mode = isbn13', function () {
            let object = new Isbn({mode: Isbn.MODE_ISBN_13});

            [
                '9782723442282',
                '978-2723442282',
                '978-2723442275',
                '978-2723455046',
                '978-2070546817',
                '978-2711858835',
                '978-2756406763',
                '978-2870971642',
                '978-2266238540',
                '978-2851806420',
                '978-0321812704',
                '978-0451225245',
                '978-0471292319',

            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('is invalid: mode = isbn13', function () {
            let object = new Isbn({mode: Isbn.MODE_ISBN_13});

            [
                '272_3442276',
                '272X455041',
                '207-0546-X10',
                '2711858839Q',
                '2756406767X',
                '978-27234422821',
                '978-272344228',
                '978-2723442-82',
                '978-2723442281',
                '978-0321513774',
                '979-0431225385',
                '980-0474292319',
                '0-4X19-92619812',
                '978_2723442282',
                '978#2723442282',
                '978-272C442282',

                // valid isbn10
                '2723442284',
                '2723442276',
                '2723455041',
                '2070546810',
                '2711858839',
                '2756406767',
                '2870971648',
                '226623854X',
                '2851806424',
                '0321812700',
                '0-45122-5244',
                '0-4712-92311',
                '0-9752298-0-X',
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not a valid ISBN-13.');
            });
        });
    });
});
