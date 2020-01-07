import AbstractConstraint            from './AbstractConstraint';
import { isDateObject, trim }        from '../Utils/functions';
import { DateTime as LuxonDateTime } from 'luxon';

const MESSAGE_INVALID = 'This value is not a valid datetime.';

export default class DateTime extends AbstractConstraint {
    /**
     * @param {{message: string, format: string, trim: boolean}} [options]
     */
    constructor(options) {
        super(options);
    }

    /**
     * @link https://moment.github.io/luxon/docs/manual/parsing.html
     *
     * @return {{message: string, format: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
            'format': 'yyyy-MM-dd',
        };
    }

    /**
     * @return {string[]}
     */
    getRequiredOptions() {
        return ['format'];
    }

    /**
     * Test provided value and return Error if occurs
     *
     * @param value
     *
     * @return {Error|undefined}
     */
    validate(value) {
        if (this.options.trim) {
            value = trim(value);
        }

        if (this.isEmptyValue(value) || isDateObject(value)) {
            return undefined;
        }

        if (typeof value !== 'string' || !LuxonDateTime.fromFormat(value, this.options.format).isValid) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .setParameter('format', this.options.format)
                .build(this.options.message);
        }

        return undefined;
    }
}
