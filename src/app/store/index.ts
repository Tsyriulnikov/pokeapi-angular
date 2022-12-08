import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import * as PokemonList from './reducers/pokemon-list.reducer';
import {Common, PokemonDetails, PokemonResponse} from "../models/pokemon-list.models";



export interface StateApp {
  pokemonList: PokemonResponse,
  pokemonDetails: PokemonDetails,
  common: Common
}

export const reducers: ActionReducerMap<StateApp> = {
  pokemonList: PokemonList.pokemonListReducer,
  pokemonDetails: PokemonList.pokemonListReducer,
  common: PokemonList.pokemonListReducer
}



const _selectPokemonList = (state: StateApp) => state.pokemonList;
const _selectPokemonProps = (state: StateApp) => state.pokemonDetails;
const _selectCommon = (state: StateApp) => state.common;

export const selectPokemonList = createSelector(
  _selectPokemonList,
  (state:PokemonResponse) => state.results
)
export const selectPokemonProps = createSelector(
  _selectPokemonProps,
  (state:PokemonDetails) => state.pokemonProps
)
export const selectPageSize = createSelector(
  _selectCommon,
  (state:Common) => state.pageSize
)
export const selectPageIndex = createSelector(
  _selectCommon,
  (state:Common) => state.pageIndex
)


