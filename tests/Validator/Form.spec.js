import { Form, NotBlank, Email, Ip, Length } from '../../src/validator';
import Callback                              from '../../src/Constraints/Callback';
import Collection                            from '../../src/Constraints/Collection';

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

            const e = form.validate({
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

        it('Validation empty form data', function () {
            const form = new Form({extra_fields: true});

            form.add('email', [
                new NotBlank(),
                new Email(),
                new Length({min: 17}),
            ]);

            let e = form.validate({});

            assert.strictEqual(Object.keys(e).length, 1);
        });

        it('Validation with custom options', function () {
            const form         = new Form({extra_fields: true});
            const extraOptions = {test: 'success'};
            const username     = 'awesome';

            form.add('username', [
                new Callback({
                    callback: (v, o) => {
                        return v === username
                            && typeof o.form !== 'undefined'
                            && o.test === 'success';
                    }
                }),
            ]);

            let e = form.validate({username: username}, extraOptions);

            assert.strictEqual(Object.keys(e).length, 0);
        });
    });

    describe('#getParent() / #setParent()', function () {
        it('simple getter / setter - invalid type', function () {
            const form = new Form();

            try {
                form.setParent(1);
            } catch (e) {
                assert.strictEqual(e.message, 'Form expected to by type of "Form", number given.');
            }
        });

        it('simple getter / setter - valid type', function () {
            const form1 = new Form();
            const form2 = new Form();

            assert.ok(typeof form1.getParent() === 'undefined');
            assert.ok(typeof form2.getParent() === 'undefined');
            form2.setParent(form1);

            assert.ok(typeof form1.getParent() === 'undefined');
            assert.ok(typeof form2.getParent() !== 'undefined');

            assert.ok(form2.getParent() === form1);
            assert.ok(form2.getParent() !== form2);
        });

        it('Collection constraint - invalid', function () {
            const form = new Form();

            form.add('emails', new Collection({
                fields: {
                    email: [
                        new Callback({
                            callback: (value, options) => {
                                assert.ok(options.form.getParent() === form);
                                assert.ok(options.form !== form);

                                return false;
                            }
                        })
                    ]
                }
            }));

            const e = form.validate({
                emails: [
                    {email: 'test-1@example.com'},
                    {email: 'test-2@example.com'},
                ]
            });

            assert.strictEqual(Object.keys(e).length, 1);
            assert.strictEqual(e.emails[0].email[0].message, 'This value is not a valid.');
            assert.strictEqual(e.emails[1].email[0].message, 'This value is not a valid.');
        });

        it('Collection constraint - valid', function () {
            const form = new Form();

            form.add('emails', new Collection({
                fields: {
                    email: [
                        new Callback({
                            callback: (value, options) => {
                                assert.ok(options.form.getParent() === form);

                                return true;
                            }
                        })
                    ]
                }
            }));

            const e = form.validate({
                emails: [
                    {email: 'test-1@example.com'},
                    {email: 'test-2@example.com'},
                ]
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

    describe('#addTransformer() and #addReverseTransformer()', function () {
        it('Form data can be transformed before validate', function () {
            const form = new Form();
            const options = {separator: '@'};

            form
                .addTransformer((data, options) => {
                    data.email += options.separator;

                    return data;
                })
                .addTransformer(data => {
                    data.email += 'example.com';

                    return data;
                });

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ]);

            const e = form.validate({email: 'email'}, options);
            const data = form.getData();

            assert.strictEqual(Object.keys(e).length, 0);
            assert.strictEqual(data.email, 'email@example.com');
        });

        it('Form data can be transformed after validate', function () {
            const form = new Form();

            form
                .addTransformer((data) => {
                    data.email += '@example.com';

                    return data;
                })
                .addReverseTransformer(data => {
                    data.email = data.email.replace(/@example.com/, '');

                    return data;
                });

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ]);

            const e = form.validate({email: 'email'});
            const data = form.getData();

            assert.strictEqual(Object.keys(e).length, 0);
            assert.strictEqual(data.email, 'email');
        });

        it('Field data can be transformed before validate', function () {
            const form = new Form();
            const options = {separator: '@'};

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ])
                .get('email')
                // this transformers will be assigned to the field
                .addTransformer((value, options) => {
                    value += options.separator;

                    return value;
                })
                .addTransformer(value => {
                    value += 'example.com';

                    return value;
                });

            const e = form.validate({email: 'email'}, options);
            const data = form.getData();

            assert.strictEqual(Object.keys(e).length, 0);
            assert.strictEqual(data.email, 'email@example.com');
        });

        it('Field data can be transformed after validate', function () {
            const form = new Form();
            const options = {separator: '@'};

            form
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ])
                .get('email')
                // this transformers will be assigned to the field
                .addTransformer((value) => {
                    value += '@example.com';

                    return value;
                })
                .addReverseTransformer(value => {
                    value = value.replace(/@example.com/, '');

                    return value;
                });

            const e = form.validate({email: 'email'}, options);
            const data = form.getData();

            assert.strictEqual(Object.keys(e).length, 0);
            assert.strictEqual(data.email, 'email');
        });

        it('Field error can be mapped', function () {
            const form = new Form();

            form
                .add('error_field')
                .add('email', [
                    new NotBlank(),
                    new Email(),
                ], {map_name: 'error_field'});

            const e = form.validate({email: 'email'});

            assert.strictEqual(Object.keys(e).length, 1);
            assert.strictEqual(e.error_field.join('; '), 'Error: This value is not valid email.');
        });
    });
});
