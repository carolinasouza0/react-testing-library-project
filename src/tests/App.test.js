import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémon');
  });

  it('Testa se o redirecionamento de páginas está funcionando corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const { location } = history;

    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    expect(location.pathname).toBe('/');

    history.push('/');
    userEvent.click(links[1]);
    // console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/about');

    history.push('/');
    userEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/page-not-found');
    expect(history.location.pathname).toBe('/page-not-found');
    console.log(history.location.pathname);
  });
});
