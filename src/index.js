/* eslint-disable default-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { reducer } from './App'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer)

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
