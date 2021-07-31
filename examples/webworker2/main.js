import work from '../../src/index';

const w = work(require.resolve('./worker.js'));

let first = true;
w.addEventListener('message', (ev) => {
  if (first) {
    // revoke the Object URL that was used to create this worker, so as
    // not to leak it
    URL.revokeObjectURL(w.objectURL);
    first = false;
  }
  console.log(ev.data);
});

w.postMessage(4); // send the worker a message
