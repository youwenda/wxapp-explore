export default function promisify(fn) {
  return function promisifyWrapper(options = {}) {
    return new Promise((resolve, reject) => {
      Object.assign(options, {
        success(...args) {
          resolve(...args);
        },
        fail(err) {
          if (err && err.errMsg) {
            reject(new Error(err.errMsg));
          } else {
            reject(err);
          }
        }
      });
      fn(options);
    });
  };
}
