import {ActionReducerMap, createSelector} from "@ngrx/store";
import * as PokemonList from './reducers/pokemon-list.reducer';
import {PokemonListState} from "./reducers/pokemon-list.reducer";


export interface StateApp {
  pokemonList: PokemonListState
}

export const pokemonList: ActionReducerMap<StateApp> = {
  pokemonList: PokemonList.pokemonListReducer
}


// export const getPokemonList = createFeatureSelector('pokemonList')
export const getPokemonList = (state: StateApp) => state.pokemonList

export const selectPokemonListProps = createSelector(
  getPokemonList,
  (pokemonList: PokemonListState) => pokemonList.pokemonDetails.pokemonProps
)
