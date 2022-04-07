import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FoodsProvider } from './hooks/useFoods';
import { DrinksProvider } from './hooks/useDrinks';

ReactDOM.render(
  <BrowserRouter>
    <FoodsProvider>
      <DrinksProvider>
<<<<<<< HEAD
        <App />
=======

        <App />

>>>>>>> 2b1cf129e864703567b27397ddc9d4696113cdbb
      </DrinksProvider>
    </FoodsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
