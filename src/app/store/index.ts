import {ActionReducerMap} from "@ngrx/store";
import * as PokemonList from './reducers/pokemon-list.reducer';
import {PokemonListActions} from "./actions/pokemon-list.actions";

export interface State {
  pokemonList: PokemonList.PokemonListState
}

export const pokemonList: ActionReducerMap<State,PokemonListActions> = {
  pokemonList: PokemonList.pokemonListReducer
}
