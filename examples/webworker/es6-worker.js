import gamma from 'gamma';

export default function () {
  self.addEventListener('message', (ev) => {
    const startNum = parseInt(ev.data, 10); // ev.data=4 from main.js

    setInterval(() => {
      const r = startNum / Math.random() - 1;
      self.postMessage([startNum, r, gamma(r)]);
    }, 500);
  });
}
