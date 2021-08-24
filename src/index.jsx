import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'mobx-react';
import TodoStore from './store';

const store = new TodoStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider todoStore={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
