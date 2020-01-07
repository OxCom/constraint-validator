import { Form, NotBlank, Email, Ip, Length } from '../../dist/validator';

const assert = require('assert');

describe('Form', function () {
    describe('#constructor()', function () {
        it('empty constructor', function () {
            new Form();
        });
    });

    describe('#add()', function () {
        it('form fields number', function () {
            const form = new Form();

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ])
                .add('password');

            assert.strictEqual(Object.keys(form.fields).length, 2);
        });

        it('The field already exists in this form.', function () {
            const form = new Form();

            try {
                form
                    .add('email')
                    .add('email', []);

                assert.fail('Form should not allow to declare one field multiple times.');
            } catch (e) {
                assert.strictEqual(e.message, 'The field email already exists in this form.');
            }
        });

        it('The field name is too short.', function () {
            const form = new Form();

            try {
                form.add('');

                assert.fail('Form should not allow empty string as field name.');
            } catch (e) {
                assert.strictEqual(e.message, 'The field name is too short.');
            }
        });

        it('The field should be type of string.', function () {
            const form = new Form();

            [123, null, NaN, {a: 1}, function () {}].forEach((field) => {
                try {
                    form.add(field);

                    assert.fail('The field name should be a string.');
                } catch (e) {
                    assert.strictEqual(e.message, `The field should be type of "string", "${typeof field}" given.`);
                }
            });
        });

        it('Constraints list should be array', function () {
            [123, null, NaN, {a: 1}, function () {}].forEach((constraints) => {
                try {
                    const form = new Form();
                    form.add('email', constraints);

                    assert.fail('The constants name should be a string.');
                } catch (e) {
                    assert.strictEqual(e.message, `The constants should be type of "array", "${typeof constraints}" given.`);
                }
            });
        });
    });

    describe('#validate()', function () {
        it('Validation passed', function () {
            const form = new Form();

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ])
                .add('password', [
                    new NotBlank(),
                    new Length({min: 6}),
                ])
                .add('ip', [
                    new Ip(),
                ]);

            let e = form.validate({
                email: 'email@example.com',
                password: '1234567',
            });

            assert.strictEqual(Object.keys(e).length, 0);

            e = form.validate({
                email: 'email@example.com',
                password: '1234567',
                ip: '8.8.8.8',
            });

            assert.strictEqual(Object.keys(e).length, 0);
        });

        it('Validation errors', function () {
            const form = new Form();

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                    new Length({min: 17}),
                ])
                .add('password', [
                    new NotBlank(),
                    new Length({min: 6}),
                ])
                .add('ip', [
                    new Ip(),
                ]);

            let e = form.validate({
                email: '123',
                password: '---',
                ip: 789,
            });

            assert.strictEqual(Object.keys(e).length, 3);

            e = form.validate({
                email: '123',
                password: '---',
                ip: '8.8.8.8',
            });

            assert.strictEqual(Object.keys(e).length, 2);
            assert.ok(typeof e.email !== 'undefined');
            assert.ok(typeof e.password !== 'undefined');

            assert.strictEqual(e.email.join('; '), 'Error: This value is not valid email.; Error: This value is too short. It should have 17 character(s) or more.');
            assert.strictEqual(e.password.join('; '), 'Error: This value is too short. It should have 6 character(s) or more.');
        });

        it('Validation with NO extra fields error', function () {
            const form = new Form();

            form
                .add('email')
                .add('password');

            let e = form.validate({
                email: 'email@example.com',
                password: '1234567',
                ip: '8.8.8.8',
            });

            assert.strictEqual(Object.keys(e).length, 1);
            assert.ok(typeof e.form !== 'undefined');

            assert.strictEqual(e.form.join('; '), 'Error: This form should not contain extra fields.');
        });

        it('Validation with WITH extra fields passed', function () {
            const form = new Form({extra_fields: true});

            form
                .add('email')
                .add('password');

            let e = form.validate({
                email: 'email@example.com',
                password: '1234567',
                ip: '8.8.8.8',
            });

            assert.strictEqual(Object.keys(e).length, 0);
        });
    });

    describe('#getData()', function () {
        it('Form data can be fetched after validation', function () {
            const form = new Form();

            const customInjection = new Length({min: 3});
            customInjection.validate = (value, options) => {
                assert.ok(typeof options.form !== 'undefined');
                const data = options.form.getData();

                assert.strictEqual(Object.keys(data).length, 3);
                assert.strictEqual(data.email, 'email@example.com');
                assert.strictEqual(data.password, '1234567');
                assert.strictEqual(data.ip, '8.8.8.8');

                return undefined;
            };

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ])
                .add('password', [
                    new NotBlank(),
                    new Length({min: 6}),
                ])
                .add('ip', [
                    new Ip(),
                    customInjection,
                ]);

            const e = form.validate({
                email: 'email@example.com',
                password: '1234567',
                ip: '8.8.8.8',
            });

            assert.strictEqual(Object.keys(e).length, 0);
            const data = form.getData();

            assert.strictEqual(Object.keys(data).length, 3);
            assert.strictEqual(data.email, 'email@example.com');
            assert.strictEqual(data.password, '1234567');
            assert.strictEqual(data.ip, '8.8.8.8');
        });
    });
});
