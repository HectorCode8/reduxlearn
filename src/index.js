/* eslint-disable default-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { reducer, asyncMiddleware } from './App'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer, applyMiddleware(asyncMiddleware));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
