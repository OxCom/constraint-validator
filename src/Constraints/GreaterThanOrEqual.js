import AbstractCompareConstraint from './AbstractCompareConstraint';
import {isDateObject}            from '../Utils/functions';

const MESSAGE_GTE = 'This value should be greater than or equal to {{ compared_value }}.';

export default class GreaterThanOrEqual extends AbstractCompareConstraint {
    /**
     * @return {{message: string, message_strict: string}}
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            ...{'message': MESSAGE_GTE},
        };
    }

    /**
     * @param value1
     * @param value2
     *
     * @return {boolean}
     */
    compare(value1, value2) {
        if (isDateObject(value1) && isDateObject(value2)) {
            return value1.getTime() >= value2.getTime();
        }

        return value1 >= value2;
    }
}
