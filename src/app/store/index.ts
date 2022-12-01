import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import * as PokemonList from './reducers/pokemon-list.reducer';
import {getPokemons} from "./reducers/pokemon-list.reducer";


export interface StateApp {
  pokemonList: PokemonList.PokemonListState
}

export const reducers: ActionReducerMap<StateApp> = {
  pokemonList:PokemonList.pokemonListReducer
}

export const getPokemonList = createFeatureSelector<PokemonList.PokemonListState>('pokemons')
export const selectPokemonListProps = createSelector(
  getPokemonList,
  getPokemons

  // (state: PokemonListState) => {
  //   return {
  //     pokemons: state.pokemonDetails.pokemonProps
  //   }
  // }
)

