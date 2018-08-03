// @flow
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import core from '../../framework/core'
import fromJSOrdered from '../redux/fromJSOrdered';
import { displayErrorMessage } from '../../features/errorMessage/action';

type Options = {
  body?: any,
  query?: Object,
  action?: Object,
  method?: string,
  action?: Object,
};

const defaultOptions = {
  query: {},
  body: {},
  method: 'GET',
  action: {},
  startPath: '/api',
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

export const apiGet = (url: string, query = {}, options: Options = {}) =>
  apiGeneric(url, { ...options, query, method: 'GET' });

export const apiPut = (url: string, body = {}, options: Options = {}) =>
  apiGeneric(url, { ...options, body, method: 'PUT' });

export const apiPost = (url: string, body = {}, options: Options = {}) =>
  apiGeneric(url, { ...options, body, method: 'POST' });

export const apiDelete = (url: string, body = {}, options: Options = {}) =>
  apiGeneric(url, { ...options, body, method: 'DELETE' });

const apiGeneric = (url: string, options: Options = {}) => {
  const authToken = getCookie('authToken');

  const opt = Object.assign({}, defaultOptions, options);

  const query = serialize(opt.query);
  const symbol = url.indexOf('?') === -1 ? '?' : '&';

  let headers = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = authToken;
  }

  let finalUrl = `${opt.startPath}${url}`

  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    finalUrl = url
  }

  const queryString = query ? `${symbol}${query}` : ''

  finalUrl = `${finalUrl}${queryString}`

  const finalOptions = {
    url: finalUrl,
    method: opt.method,
    headers,
    crossDomain: true,
    withCredentials: (opt.withCredentials === undefined) ? true : opt.withCredentials,
    body: opt.body,
    responseType: 'json',
  }

  return ajax(finalOptions)
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
      if (error.status === 403) {
        window.location.href = '/login';
      } else if (error.status === 401 && error.response.code === 'TOKEN_EXPIRED') {
        core.storage.remove('authToken')
        core.storage.remove('authName')

        window.location.href = '/login'
      } else if (error.status === 401) {
        return Observable.of({
          error: error.response.message,
          status: error.status,
        })
      } else {
        const additionalError = (error.response && error.response.error) ? error.response.error : ''

        return Observable.of(displayErrorMessage(`${error.message}. ${additionalError}`));
      }

      return Observable.of('');
    });
};

export const responseToAction = (type: string) => (payload: any) => ({
  type,
  ...payload,
});

export const makeApi = (getApiOptions: () => ({})) => ({
  get: (url, query = {}, options = {}) => apiGet(url, query, {...getApiOptions(), ...options}),
  post: (url, body = {}, options = {}) => apiPost(url, body, {...getApiOptions(), ...options}),
  put: (url, body = {}, options = {}) => apiPut(url, body, {...getApiOptions(), ...options}),
  delete: (url, body = {}, options = {}) => apiDelete(url, body, {...getApiOptions(), ...options}),
  serialize: serialize,
  responseToAction,
})
