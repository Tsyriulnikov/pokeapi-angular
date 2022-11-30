import {PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {createReducer, on} from "@ngrx/store";
import {fetchPokemonList, fetchPokeProps} from "../actions/pokemon-list.actions";

export interface PokemonListState {
  pokemonList: PokemonResponse,
  pokemonDetails: PokemonDetails
}

const pokemonListInitialState: PokemonListState = {
  pokemonList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  pokemonDetails: {
    pokemonProps: []
  }
}

export const pokemonListReducer = createReducer(
  pokemonListInitialState,
  on(fetchPokemonList, (state, {payload}) => ({...state, pokemonList: payload})),
  on(fetchPokeProps, (state, {payload}) => ({...state, pokemonDetails:{pokemonProps:payload}}))
)
