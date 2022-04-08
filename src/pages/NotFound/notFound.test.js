import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste a página NotFound', () => {
  it('text not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablal');
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
