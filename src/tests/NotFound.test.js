import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se a página contém um h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/page-not-found');
    });

    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
  });

  it('Testa se a página mostra uma imagem na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/page-not-found');
    });

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
