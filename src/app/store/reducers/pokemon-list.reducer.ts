import {PokemonResponse} from "../../models/pokemon-list.models";
import {PokemonListActions, PokemonListActionTypes} from "../actions/pokemon-list.actions";


export interface PokemonListState {
  pokemonList: PokemonResponse
}

const pokemonListInitialState: PokemonListState = {
  pokemonList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
}

export function pokemonListReducer(
  state: PokemonListState = pokemonListInitialState,
  action: PokemonListActions): PokemonListState {
  switch (action.type) {
    case PokemonListActionTypes.FetchPokemonList:
      return {...state, pokemonList:action.payload}
    default:
      return state;
  }
}
