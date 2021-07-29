# webworkpack

> launch a web worker that can require() in the browser with webpack.

## Installation

```bash
npm install webworkpack --save
```

## Example

First, a `main.js` file will launch the `worker.js` and print its output:

```js
import work from 'webworkpack';

let w = work(require.resolve('./worker.js'));
w.addEventListener('message', event => {
    console.log(event.data);
});

w.postMessage(4); // send the worker a message
```

then worker.js can require() modules of its own. The worker function lives inside of the module.exports:

```js
import gamma from 'gamma'

module.exports = function worker (self) {
    self.addEventListener('message', (event) => {
        const startNum = parseInt(event.data); // ev.data=4 from main.js
        setInterval(() => {
            const r = startNum / Math.random() - 1;
            self.postMessage([ startNum, r, gamma(r) ]);
        }, 500);
    });
};
```

Now after [webpackifying](https://webpack.github.io/) this example, the console will contain output from the worker:

```txt
[ 4, 0.09162078520553618, 10.421030346237066 ]
[ 4, 2.026562457360466, 1.011522336481017 ]
[ 4, 3.1853125018703716, 2.3887589540750214 ]
[ 4, 5.6989969260510005, 72.40768854476167 ]
[ 4, 8.679491643020487, 20427.19357947782 ]
[ 4, 0.8528139834191428, 1.1098187157762498 ]
[ 4, 8.068322137547542, 5785.928308309402 ]
...
```

## API

```js
import work from 'webworkpack'
```

### let w = work(require.resolve(modulePath) [, options])

Return a new web worker from the module at modulePath.

The file at modulePath should export its worker code in module.exports as a function that will be run with no arguments.

Note that all the code outside of the module.exports function will be run in the main thread too so don't put any computationally intensive code in that part. It is necessary for the main code to require() the worker code to fetch the module reference and load modulePath's dependency graph into the bundle output.

### options

* all - bundle all the dependencies in the web worker and not only the used ones. can be useful in edge cases that I'm not aware of when the used dependencies aren't being resolved as expected due to the runtime regex checking mechanism or just to avoid additional work at runtime to traverse the dependencies tree.
* bare - the return value will be the blob constructed with the worker's code and not the web worker itself.
 
