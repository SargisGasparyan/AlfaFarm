//* Continue writting the code as expected
  //! Please write your code as clean as possible
  //! Documentize your code with comments
  //! Use React Components as far as you can
  //! Use React new features to improve performance
  //! Use Promise.then only with `React.useEffect` or functions who can't return promise. In other cases use async/await

//* Please define the types
  //! Application uses typescript, so don't forget to define the types
  //! Use types like `any` as less as you can

import * as http from 'http';
let app = require('./server').default;
let currentApp = app;
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, (error?: Error) => {
  error && console.log(error);
  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅ Server-side HMR Enabled!');
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) { console.error(error); }
  });
}
