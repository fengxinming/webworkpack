import work from '../../src/index';

// use 'normal' webworkify to create a worker that listens for a URL to a
// script and loads said script using importScripts
const w = work(require.resolve('./bare-blob-worker.js'));
let first = true;
w.addEventListener('message', (ev) => {
  console.log(ev.data);
  if (first) {
    // first message comes back when the worker has imported our script
    w.postMessage(4);
    first = false;
  }
});

// use `bare:true` to get a Blob of the require()'ed module, then manually
// create an object url to a script for the worker to import and execute
const blob = work(require.resolve('./worker.js'), { bare: true });
const url = URL.createObjectURL(blob);

w.postMessage(url); // send the worker the URL for a script to load with importScripts
