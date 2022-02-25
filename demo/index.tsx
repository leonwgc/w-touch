import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const initialState = { theme: '#005cff' };
const store = configureStore(initialState, true);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
