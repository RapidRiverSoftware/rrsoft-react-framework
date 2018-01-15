// @flow
import memoize from 'lodash/memoize';
import each from 'lodash/each';

const validators = {
  required: () => value => (value ? undefined : 'Required'),
  requiredIfYes: wantValidate => (value) => {
    if (wantValidate === 'yes') {
      return value ? undefined : 'Required';
    }

    return undefined;
  },
  maxLength: max => (value) => {
    if (value && value.length > max) {
      return `Too Long - Max Characters ${max}`;
    }
    return undefined;
  },
  minLength: min => (value) => {
    if (!value || value.length < min) {
      return `Too Short - Min Characters ${min}`;
    }
    return undefined;
  },
  numeric: () => value => (isNaN(value) ? 'Needs to be a Number' : undefined),
  positive: () => value => (parseInt(value, 10) < 0 ? 'Cannot be negative' : undefined),
  email: () => value =>
    (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined),
};

const memo = {};
each(validators, (v, k) => {
  memo[k] = memoize(v);
});

export default memo;
