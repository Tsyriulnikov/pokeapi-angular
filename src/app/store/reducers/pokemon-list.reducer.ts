import {PokemonResponse} from "../../models/pokemon-list.models";
import {createReducer, on} from "@ngrx/store";
import {fetchPokemonList} from "../actions/pokemon-list.actions";

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

export const pokemonListReducer = createReducer(
  pokemonListInitialState,
  on(fetchPokemonList, (state,{payload})=>({...state, pokemonList:payload}))
)
