import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedApp from './containers/ConnectedApp';
import './index.css';
import { Provider } from 'react-redux';
import store from './configureStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
