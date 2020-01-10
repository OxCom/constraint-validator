import { Email } from '../../src/validator';

const assert = require('assert');

describe('Email', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            new Email();
        });

        it('invalid mode in configuration', function () {
            try {
                new Email({mode: 'test'});
            } catch (e) {
                assert.strictEqual(e.message, 'Invalid validation mode provided: test');
            }
        });
    });

    describe('Static properties', function () {
        it('Expose constant "MODE_SIMPLE"', function () {
            assert.strictEqual('simple_regexp', Email.MODE_SIMPLE);
        });

        it('Expose constant "MODE_HTML5"', function () {
            assert.strictEqual('html5_regexp', Email.MODE_HTML5);
        });

        it('Expose constant "MODE_HTML5_INPUT"', function () {
            assert.strictEqual('html5_input', Email.MODE_HTML5_INPUT);
        });
    });

    describe('#validate()', function () {
        it('simple mode - invalid', function () {
            const object = new Email({
                mode: 'simple_regexp',
                message: '{{ value }} is not valid.',
            });

            ['asd', 'asd@', '@qwe', '<><>%$#@<><>#$%', 'asd@123', '123@qwe', '123@123', 'qwe@qwe', 'asd@123.', 'qwe@qwe.']
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.strictEqual(e.message, `${value} is not valid.`);
                });
        });

        it('simple mode - valid', function () {
            const object = new Email({
                mode: 'simple_regexp',
                message: '{{ value }} is not valid.',
            });

            [
                '', null, undefined,
                'asd@123.12', '123@qwe.12', '123@123.12', 'qwe@qwe.12',
                'asd@123.qw', '123@qwe.qw', '123@123.qw', 'qwe@qwe.qw',
                '<><>@123.qw',
            ]
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('html5 mode - invalid', function () {
            const object = new Email({
                mode: 'html5_regexp',
                message: '{{ value }} is not valid.',
            });

            [
                'asd', 'asd@', '@qwe', '<><>%$#@<><>#$%', 'asd@123',
                '123@qwe', '123@123', 'qwe@qwe', 'asd@123.', 'qwe@qwe.', '<><>@123.qw',
            ]
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.strictEqual(e.message, `${value} is not valid.`);
                });
        });

        it('html5 mode - valid', function () {
            const object = new Email({mode: 'html5_regexp'});

            [
                '', null, undefined,
                '  asd@123.12  ', 'asd@123.12  ',
                'asd@123.12', '123@qwe.12', '123@123.12', 'qwe@qwe.12',
                'asd@123.qw', '123@qwe.qw', '123@123.qw', 'qwe@qwe.qw',

            ]
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('html5 input mode - invalid', function () {
            const object = new Email({mode: 'html5_input'});

            [
                'asd', 'asd@', '@qwe', '<><>%$#@<><>#$%',
                'asd@123.', 'qwe@qwe.', '<><>@123.qw',
                ' asd@123. ',
            ]
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.strictEqual(e.message, 'This value is not valid email.', `Email '${value}' should be not valid.`);
                });
        });

        it('html5 input mode - valid', function () {
            const object = new Email({mode: 'html5_input'});

            [
                '', null, undefined,
                'asd@123.12', '123@qwe.12', '123@123.12', 'qwe@qwe.12',
                'asd@123.qw', '123@qwe.qw', '123@123.qw', 'qwe@qwe.qw',
                'asd@123', '123@qwe', '123@123', 'qwe@qwe',
            ]
                .forEach((value) => {
                    const e = object.validate(value);
                    assert.ok(typeof e === 'undefined', e);
                });
        });
    });

    describe('Symfony', function() {
        it('Mode MODE_SIMPLE', function () {
            const object = new Email({mode: Email.MODE_SIMPLE});

            [
                'fabien@symfony.com',
                'example@example.co.uk',
                'fabien_potencier@example.fr',
                'example@example.co..uk',
                '}~!@!@£$%%^&*().!@£$%^&*()',
                'example@example.co..uk',
                'example@-example.com',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });

        it('Mode MODE_REGEXP', function () {
            const object = new Email({mode: Email.MODE_HTML5});

            [
                'fabien@symfony.com',
                'example@example.co.uk',
                'fabien_potencier@example.fr',
                '{}~!@example.com',
            ].forEach((value) => {
                const e = object.validate(value);
                assert.ok(typeof e === 'undefined', e);
            });
        });
    });
});
