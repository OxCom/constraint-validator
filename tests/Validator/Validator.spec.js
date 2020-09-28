import { Validator, NotBlank, Email } from '../../src/validator';

const assert = require('assert');

describe('Validator/Validator', function () {
    describe('#constructor()', function () {
        it('empty constructor', function () {
            new Validator();
        });
    });

    describe('#validate()', function () {
        const validator = new Validator();

        it('NotBlank, Email - email@example.com', function () {
            const constants = [
                new NotBlank(),
                new Email(),
            ];

            let errors = validator.validate('email@example.com', constants);
            assert.ok(errors.length === 0, errors.join('; '));

            errors = validator.validate('', constants);
            assert.ok(errors.length === 1, errors.join('; '));
        });

        it('Email - email@example.com', function () {
            const constants = [
                new Email(),
            ];

            let errors = validator.validate('email@example.com', constants);
            assert.ok(errors.length === 0, errors.join('; '));

            errors = validator.validate('', constants);
            assert.ok(errors.length === 0, errors.join('; '));

            errors = validator.validate('123', constants);
            assert.ok(errors.length === 1, errors.join('; '));
            assert.strictEqual(errors.join('; '), 'Error: This value is not valid email.');
        });
    });
});
