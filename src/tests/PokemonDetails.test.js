import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemonList from '../data';

const pokemonTestIdName = 'pokemon-name';

describe('Testa o componente <PokemonDetaisl.js />', () => {
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
    userEvent.click(details);

    const name = screen.getByTestId(pokemonTestIdName);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemonList[0].name);

    const pokemonDetails = screen.getByText(`${pokemonList[0].name} Details`);
    expect(pokemonDetails).toBeInTheDocument();

    const linkNavigation = screen.queryByText(/More details/i);
    expect(linkNavigation).toBe(null);

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const summaryP = screen.getByText(pokemonList[0].summary);
    expect(summaryP).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
    userEvent.click(details);

    const name = screen.getByTestId(pokemonTestIdName);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemonList[0].name);

    const mapHeader = screen.getByRole('heading', { name: `Game Locations of ${pokemonList[0].name}`, level: 2 });
    expect(mapHeader).toBeInTheDocument();

    pokemonList[0].foundAt.forEach(({ location }) => {
      const locText = screen.getByText(location);
      expect(locText).toBeInTheDocument();
    });

    const locImage = screen.getAllByAltText(`${pokemonList[0].name} location`);
    expect(locImage).toHaveLength(pokemonList[0].foundAt.length);

    locImage.forEach((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', pokemonList[0].foundAt[index].map);
    });
  });

  it('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
    userEvent.click(details);

    const name = screen.getByTestId(pokemonTestIdName);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemonList[0].name);

    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).toHaveAttribute('type', 'checkbox');

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    const icon = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
    const iconNotInTheDoc = screen
      .queryByAltText(`${pokemonList[0].name} is marked as favorite`);
    expect(iconNotInTheDoc).toBe(null);
  });
});
