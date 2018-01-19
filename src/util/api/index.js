// @flow
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import fromJSOrdered from '../redux/fromJSOrdered';
// import { displayErrorMessage } from '../features/error_message/actions';

type Options = {
  body?: any,
  query?: Object,
  action?: Object,
  method?: string,
  action?: Object,
};

const serialize = (obj = {}, prefix) => {
  const str = [];
  let k;
  let v;
  Object.keys(obj).forEach((p) => {
    if (obj.hasOwnProperty(p)) {
      if (prefix) prefix = Array.isArray(obj) ? `${prefix}[]` : `${prefix}[${p}]`;
      k = prefix || p;
      v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      );
    }
  });
  return str.join('&');
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }
  return null;
};

export const apiGet = (url: string, options: Options = {}) =>
  apiGeneric(url, { ...options, method: 'GET' });

export const apiPut = (url: string, options: Options = {}) =>
  apiGeneric(url, { ...options, method: 'PUT' });

export const apiPost = (url: string, options: Options = {}) =>
  apiGeneric(url, { ...options, method: 'POST' });

export const apiDelete = (url: string, options: Options = {}) =>
  apiGeneric(url, { ...options, method: 'DELETE' });

const apiGeneric = (url: string, options: Options = {}) => {
  const authToken = getCookie('auth_token');
  const opt = {
    query: {},
    body: {},
    method: 'GET',
    action: {},
  };
  Object.assign(opt, options);

  if (authToken) {
    if (opt.method === 'GET') {
      opt.query.auth_token = authToken;
    } else if (opt.body instanceof FormData) {
      opt.body.append('auth_token', authToken);
    } else {
      opt.body.auth_token = authToken;
    }
  }

  const query = serialize(opt.query);
  const symbol = url.indexOf('?') === -1 ? '?' : '&';

  let headers = {
    'Content-Type': 'application/json',
  };

  if (opt.body instanceof FormData) {
    headers = {};
  }

  return ajax({
    url: `/api${url}${symbol}${query}`,
    method: opt.method,
    headers,
    crossDomain: true,
    withCredentials: true,
    body: opt.body,
    responseType: 'json',
  })
    .map((res) => {
      const result = {
        error: res.error,
        originalAction: opt.action,
        data: null,
        response: null,
        status: res.status,
      };

      if (res.response) {
        const response = fromJSOrdered(res.response);
        result.data = response.get('data');
        result.response = response;
      }
      return result;
    })
    .catch((error) => {
      if (
        (window.location.host === '127.0.0.1:3000' || window.location.host === 'localhost:3000') &&
        error.status === 401
      ) {
        window.location.href = '/sign_in';
      } else if (error.status === 401) {
        window.location.href = '/users/sign_in';
      }
      // return Observable.of(displayErrorMessage('There was an error.', error.status));
      return Observable.of('123');
    });
};

export const responseToAction = (type: string) => (payload: any) => ({
  type,
  ...payload,
});
