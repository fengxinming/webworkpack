import work from '../../src/index';

const w1 = work(require.resolve('./common-js-worker.js'));
w1.addEventListener('message', (ev) => {
  console.log('CommonJS Worker:', ev.data);
});

w1.postMessage(4); // send the worker a message

const w2 = work(require.resolve('./es6-worker.js'));
w2.addEventListener('message', (ev) => {
  console.log('ES6 Worker', ev.data);
});

w2.postMessage(4); // send the worker a message
