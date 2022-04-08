import React from 'react';
import { ThemeProvider } from 'styled-components';

import './App.css';
import theme from './global/styles/theme';
import { DrinksProvider } from './hooks/useDrinks';
import { FoodsProvider } from './hooks/useFoods';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <FoodsProvider>
        <DrinksProvider>
          <Routes />
        </DrinksProvider>
      </FoodsProvider>
    </ThemeProvider>
  );
}

export default App;
