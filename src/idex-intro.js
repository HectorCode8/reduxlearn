/* eslint-disable default-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { createStore } from 'redux';

const store = createStore((state = 0, action) => {
  switch (action.type) {
    case 'incrementar': {
      return state + 1
    }
    case 'decrementar': {
      return state - 1
    }
    case 'set': {
      return action.payload
    }
    default: {
      return state
    }
  }
})

console.log(store.getState())
store.dispatch({type: 'lala'})
console.log(store.getState())
store.dispatch({type: 'incrementar'})
console.log(store.getState())
store.dispatch({type: 'decrementar'})
console.log(store.getState())
store.dispatch({type: 'set', payload: 10})
console.log(store.getState())

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
