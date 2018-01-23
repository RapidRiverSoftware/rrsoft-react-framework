// @flow

import memoize from 'lodash/memoize';

const resolver = things => JSON.stringify(things);
const jsonEqualMemoize = fn => memoize(fn, resolver);

export default jsonEqualMemoize;
