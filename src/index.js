import forEach from '@ali/iot-cloud-util/es/forEach';
import forOwn from '@ali/iot-cloud-util/es/forOwn';

/* eslint-disable no-undef */
const __webpack_require__ = arguments[2];
const fns = __webpack_require__.m;

const defineEsModule = 'function(e){'
  + '"undefined" != typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{'
    + 'value:"Module"'
  + '}),'
  + 'Object.defineProperty(e,"__esModule",{'
    + 'value:!0'
  + '})'
+ '}';

const defineGetter = 'function(e,t,r){'
  + '_wr.o(e,t)||Object.defineProperty(e,t,{'
    + 'enumerable:!0,'
    + 'get:r'
  + '})'
+ '}';

const getDefaultExport = 'function(e){'
  + 'var t = e && e.__esModule'
  + '?function(){'
    + 'return e.default;'
  + '}'
  + ':function(){'
    + 'return e;'
  + '};'
  + 'return _wr.d(t,"a",t),t'
+ '}';

const hasOwnProperty = 'function(e,t){'
  + 'return Object.prototype.hasOwnProperty.call(e,t);'
+ '}';

export default function webworkpack(moduleId, options) {
  let sfns = [];
  let scache = [];
  if (Array.isArray(fns)) {
    forEach(fns, (cb, index) => {
      sfns[index] = cb.toString();
      scache[index] = `i:${index},l:${index === moduleId},exports:{}`;
    });
    sfns = `[${sfns.join(',')}]`;
  }
  else {
    forOwn(fns, (cb, key) => {
      sfns[sfns.length] = `"${key}":${cb.toString()}`;
      scache[scache.length] = `"${key}":{i:"${key}",l:${key === moduleId},exports:{}}`;
    });
    sfns = `{${sfns.join(',')}}`;
  }
  scache = `{${scache.join(',')}}`;

  const webpackBootstrap = __webpack_require__.toString();
  const installedModules = webpackBootstrap.match(/if\s*\((\w+)\[\w+\]\)/)[1];
  const modules = webpackBootstrap.match(/(\w+)\[\w+\]\.call/)[1];
  const src = [
    `var ${modules}=${sfns}`,
    `var ${installedModules}={}`,
    `var _wr=${webpackBootstrap}`,
    `_wr.m=${sfns}`,
    `_wr.c=${scache}`,
    `_wr.d=${defineGetter}`,
    `_wr.r=${defineEsModule}`,
    `_wr.n=${getDefaultExport}`,
    `_wr.o=${hasOwnProperty}`,
    '_wr.p = ""',
    `var _entry=_wr('${moduleId}')`,
    '_entry=_entry&&_entry.__esModule?_entry["default"]:_entry;typeof _entry==="function"&&_entry()'
  ];
  const blob = new Blob([src.join(';')], { type: 'text/javascript' });
  if (options && options.bare) {
    return blob;
  }
  const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);
  worker.objectURL = workerUrl;
  return worker;
}
