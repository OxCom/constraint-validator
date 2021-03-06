import AbstractCompareConstraint from './AbstractCompareConstraint';
import {isDateObject}            from '../Utils/functions';

const MESSAGE_EQ = 'This value should be equal to {{ compared_value }}.';

export default class EqualTo extends AbstractCompareConstraint {
    /**
     * @return {{message: string, message_strict: string}}
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            ...{'message': MESSAGE_EQ},
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
            return value1.getTime() === value2.getTime();
        }

        return value1 == value2;
    }
}
