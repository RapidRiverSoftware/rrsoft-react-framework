// @flow
import * as Immutable from 'immutable';

export default function fromJSOrdered(js: any): any {
  if (typeof js !== 'object' || js === null) return js;

  if (Array.isArray(js)) {
    return Immutable.Seq(js)
      .map(fromJSOrdered)
      .toList();
  }

  return Immutable.Seq(js)
    .map(fromJSOrdered)
    .toOrderedMap();
}
