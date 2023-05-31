import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemonList from '../data';

const dataTestIdName = 'pokemon-name';

describe('Testa componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const name = screen.getByTestId(dataTestIdName);
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(pokemon.name);

      const type = screen.getByTestId('pokemon-type');
      expect(type).toBeInTheDocument();
      expect(type).toHaveTextContent(pokemon.type);

      const weight = screen.getByTestId('pokemon-weight');
      const { averageWeight } = pokemon;
      expect(weight).toBeInTheDocument();
      expect(weight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', pokemon.image);
      expect(image).toHaveAttribute('alt', `${pokemon.name} sprite`);

      userEvent.click(nextBtn);
    });
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const name = screen.getByTestId(dataTestIdName);
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(pokemon.name);

      const details = screen.getByText(/More details/i);
      expect(details).toBeInTheDocument();
      expect(details).toHaveAttribute('href', `/pokemon/${pokemon.id}`);
      userEvent.click(nextBtn);
    });
  });

  it('Testa se ao clicar no link de navegação do Pokémon é feito o redirecionamento correto', () => {
    const { history } = renderWithRouter(<App />);

    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeInTheDocument();

    const details = screen.getByText(/More details/i);
    expect(details).toBeInTheDocument();

    userEvent.click(details);

    expect(history.location.pathname).toBe(`/pokemon/${pokemonList[0].id}`);
    const pikachuDetails = screen.getByText(`${pokemonList[0].name} Details`);
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const details = screen.getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);

    userEvent.click(details);
    expect(history.location.pathname).toBe(`/pokemon/${pokemonList[0].id}`);

    const favoriteBtn = screen.getByText(/Pokémon favoritado?/i);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    userEvent.click(homeLink);
    const pokemonName = screen.getByTestId(dataTestIdName);
    expect(pokemonName).toBeInTheDocument();
    const icon = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
