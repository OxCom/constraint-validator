import AbstractConstraint          from './AbstractConstraint';
import {trim}                      from '../Utils/functions';
import {DateTime as LuxonDateTime} from 'luxon';

const MESSAGE_INVALID = 'This value is not a valid timezone.';

export default class Timezone extends AbstractConstraint {
    /**
     * @param {{message: string, trim: boolean}} [options]
     */
    constructor(options = {}) {
        super(options);
    }

    /**
     * @return {{message: string, trim: boolean}}
     */
    getDefaultOptions() {
        return {
            'trim': true,
            'message': MESSAGE_INVALID,
        };
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

        if (this.isEmptyValue(value)) {
            return;
        }

        if (typeof value !== 'string' || !LuxonDateTime.local().setZone(value).isValid) {
            return this
                .getViolationBuilder()
                .setParameter('value', value)
                .build(this.options.message);
        }
    }
}
