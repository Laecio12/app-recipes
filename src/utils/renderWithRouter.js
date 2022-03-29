// Função desenvolvida pelo Cestari na aula Dia 14.3 - RTL - Testando React Router
import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function renderWithRouter(ComponentToRender) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>
      {ComponentToRender}
    </Router>,
  );
  return { history: customHistory, ...returnFromRender };
}

export default renderWithRouter;
