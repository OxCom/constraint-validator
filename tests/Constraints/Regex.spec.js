import { Regex } from '../../dist/validator';

const assert = require('assert');

describe('Regex', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Regex();
            } catch (e) {
                assert.strictEqual(e.message, 'No "pattern" option is configured.');
            }
        });

        it('invalid pattern type in configuration', function () {
            try {
                new Regex({pattern: 123});
            } catch (e) {
                assert.strictEqual(e.message, 'Pattern should be type of "string", number given.');
            }
        });
    });

    describe('#validate()', function () {
        it('Match: true; Pattern: string - valid', function () {
            const object = new Regex({pattern: '^[a-z]+$', trim: true});

            [
                '',
                'a',
                'ab',
                ' ab  ',
                parseInt('a'),
                null,
                undefined,
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Match: true; Pattern: string - invalid', function () {
            const object = new Regex({pattern: '^[a-z]+$'});

            [
                33,
                'ab3',
                ' ab  ',
                function() {},
                {a: 1}
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not valid.');
            });
        });

        it('Match: false; Pattern: string - valid', function () {
            const object = new Regex({pattern: '^[a-z]+$', trim: true, match: false});

            [
                '',
                '3',
                '123',
                ' 123  ',
                parseInt('a'),
                null,
                undefined,
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Match: false; Pattern: string - invalid', function () {
            const object = new Regex({pattern: '^[a-z]+$', trim: true, match: false});

            [
                33,
                'a',
                'asd',
                ' asd  ',
                function() {},
                {a: 1}
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not valid.');
            });
        });

        it('Match: false; Pattern: RegExp - valid', function () {
            const object = new Regex({pattern: new RegExp('^[a-z]+$'), trim: true, match: false});

            [
                '',
                '3',
                '123',
                ' 123  ',
                parseInt('a'),
                null,
                undefined,
            ].forEach((value) => {
                const e = object.validate(value);

                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Match: false; Pattern: RegExp - invalid', function () {
            const object = new Regex({pattern: /^[a-z]+$/, trim: true, match: false});

            [
                33,
                'a',
                'asd',
                ' asd  ',
                function() {},
                {a: 1}
            ].forEach((value) => {
                const e = object.validate(value);

                assert.strictEqual(e.message, 'This value is not valid.');
            });
        });
    });
});
