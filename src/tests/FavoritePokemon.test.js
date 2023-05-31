import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <FavoritePokemon.js />', () => {
  it('Testa se é exibida na tela a mensagem correta caso não tenha pokémons favoritos', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(link);

    const noFavorite = screen.getByText('No favorite Pokémon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se apenas os pokémons favoritados são mostrados na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favoritePokemon);
    const link = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(link);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
