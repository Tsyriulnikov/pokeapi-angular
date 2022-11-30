import {ActionReducerMap} from "@ngrx/store";
import * as PokemonList from './reducers/pokemon-list.reducer';


export interface State {
  pokemonList: PokemonList.PokemonListState
}

export const pokemonList: ActionReducerMap<State> = {
  pokemonList: PokemonList.pokemonListReducer
}
