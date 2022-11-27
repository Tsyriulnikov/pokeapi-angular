import {PokemonResponse} from "../../models/pokemon-list.models";
import {PokemonListActions, PokemonListActionTypes} from "../actions/pokemon-list.actions";


export interface PokemonState {
  pokemonList: PokemonResponse
}

const pokemonListInitialState: PokemonState = {
  pokemonList: {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
}

export function pokemonListReducer(
  state = pokemonListInitialState,
  action: PokemonListActions): PokemonState {
switch (action.type){
  case PokemonListActionTypes.FetchPokemonList:
    return {...state,
      pokemonList:{...state.pokemonList, action.payload}}
}
}
