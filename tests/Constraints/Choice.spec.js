import { Choice } from '../../src/validator';

const assert = require('assert');

describe('Choice', function () {
    describe('#constructor()', function () {
        it('empty configuration', function () {
            try {
                new Choice();
            } catch (e) {
                assert.strictEqual(e.message, 'No "choices" option is configured.');
            }
        });

        it('choices configuration - valid', function () {
            new Choice({
                choices: ['a', 'b'],
            });
        });

        it('choices configuration - invalid', function () {
            try {
                new Choice({
                    choices: 1,
                });
            } catch (e) {
                assert.strictEqual(e.message, 'Choices list should be type of "array", "number" given.');
            }
        });
    });

    describe('#validate()', function () {
        it('single - valid', function () {
            const list = ['a', 0, 1, '0', '1', 1 / 3, null, -1, undefined, parseInt('a')];

            let object = new Choice({choices: list});

            list
                .forEach((value) => {
                    const e = object.validate(value);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('single - invalid', function () {
            const list = [
                {choices: ['0', '1', null, undefined], values: [0, 1, parseInt('a'), 1 / 3]},
                {choices: [2 / 6, 0, 1], values: ['0', '1', 0.333]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices});

                    parts.values.forEach((value) => {
                        const e = object.validate(value);

                        assert.strictEqual(e.message, 'The value you selected is not a valid choice.');
                    });
                });
        });

        it('multiple - valid', function () {
            const list = ['a', 0, 1, '0', '1', 1 / 3, null, -1, undefined, parseInt('a')];

            let object = new Choice({choices: list, multiple: true});
            let e;

            for (let i = 0; i < list.length - 1; i++) {
                e = object.validate(list.slice(i, i + 2));

                assert.ok(typeof e === 'undefined', e);
            }
        });

        it('multiple - invalid', function () {
            const list = [
                {choices: ['0', '1', null, undefined], values: ['0', 1 / 3]},
                {choices: [2 / 6, 0, 1], values: ['0', '1', 0.333]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices, multiple: true});
                    const e = object.validate(parts.values);

                    assert.strictEqual(e.message, 'One or more of the given values is invalid.');
                });
        });

        it('min - valid', function () {
            const list = [
                {choices: [1, 2, 3, 4, 5], values: [1, 2]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3, 4]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3, 4, 5]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices, min: 2});
                    const e = object.validate(parts.values);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('min - invalid', function () {
            const list = [
                {choices: [1, 2, 3, 4, 5], values: []},
                {choices: [1, 2, 3, 4, 5], values: [1]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices, min: 3});
                    const e = object.validate(parts.values);

                    assert.strictEqual(e.message, 'You must select at least 3 choices.');
                });
        });

        it('max - valid', function () {
            const list = [
                {choices: [1, 2, 3, 4, 5], values: []},
                {choices: [1, 2, 3, 4, 5], values: [1]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices, max: 3});
                    const e = object.validate(parts.values);

                    assert.ok(typeof e === 'undefined', e);
                });
        });

        it('max - invalid', function () {
            const list = [
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3, 4]},
                {choices: [1, 2, 3, 4, 5], values: [1, 2, 3, 4, 5]},
            ];

            list
                .forEach((parts) => {
                    const object = new Choice({choices: parts.choices, max: 2});
                    const e = object.validate(parts.values);

                    assert.strictEqual(e.message, 'You must select at most 2 choices.');
                });
        });
    });
});
