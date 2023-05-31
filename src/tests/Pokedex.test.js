import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemonList from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByText('Encountered Pokémon');
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextBtn);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextBtn);

    const thirdPokemon = screen.getByText('Caterpie');
    expect(thirdPokemon).toBeInTheDocument();

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    expect(firstPokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextBtn);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
    const firstPokemonNotShow = screen.queryByText('Pikachu');
    expect(firstPokemonNotShow).not.toBeInTheDocument();
  });

  it('Testa se a pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByText('All');

    expect(buttonAll).toBeInTheDocument();

    buttonsType.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
  });

  it('Testa se a pokédex circula somente pelos pokemons de um tipo ao clicar no tipo específico', () => {
    renderWithRouter(<App />);

    const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(psychicBtn);

    const firstPokemon = screen.getByText('Alakazam');
    expect(firstPokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);

    const secondPokemon = screen.getByText('Mew');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('Testa se o texto do botão de tipo corresponde ao nome do tipo', () => {
    renderWithRouter(<App />);

    const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
    expect(psychicBtn).toHaveTextContent('Psychic');

    const electricBtn = screen.getByRole('button', { name: 'Electric' });
    expect(electricBtn).toHaveTextContent('Electric');

    const bugBtn = screen.getByRole('button', { name: 'Bug' });
    expect(bugBtn).toHaveTextContent('Bug');

    const poisonBtn = screen.getByRole('button', { name: 'Poison' });
    expect(poisonBtn).toHaveTextContent('Poison');

    const normalBtn = screen.getByRole('button', { name: 'Normal' });
    expect(normalBtn).toHaveTextContent('Normal');

    const dragonBtn = screen.getByRole('button', { name: 'Dragon' });
    expect(dragonBtn).toHaveTextContent('Dragon');

    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    expect(fireBtn).toHaveTextContent('Fire');
  });

  it('Testa se o botão All está sempre visível', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeVisible();
  });

  it('Testa se a pokédex contém um botão para resetal o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const pok = screen.getByText(pokemon.name);
      expect(pok).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
  });
});
