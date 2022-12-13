import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {Common, PokemonAbility, PokemonDetails, PokemonResponse} from "../models/pokemon-list.models";
import {PokemonListState, reducer} from "./reducers/pokemon-list.reducer";


export interface StateApp {
  pokemonList: PokemonListState
}

export const reducers: ActionReducerMap<StateApp> = {
  pokemonList: reducer,
}


const _selectPokemonList = (state: StateApp) => state.pokemonList.pokemonList
const _selectPokemonProps = (state: StateApp) => state.pokemonList.pokemonDetails
const _selectCommon = (state: StateApp) => state.pokemonList.common
const _selectAbility = (state: StateApp) => state.pokemonList.pokemonAbility

export const selectPokemonList = createSelector(
  _selectPokemonList,
  (state: PokemonResponse) => state.results
)
export const selectPokemonProps = createSelector(
  _selectPokemonProps,
  (state: PokemonDetails) => state.pokemonProps
)
export const selectPageSize = createSelector(
  _selectCommon,
  (state: Common) => state.pageSize
)
export const selectPageIndex = createSelector(
  _selectCommon,
  (state: Common) => state.pageIndex
)
export const selectQuantityPokemons = createSelector(
  _selectPokemonList,
  (state: PokemonResponse) => state.count
)
export const selectAbility = createSelector(
  _selectAbility,
  (state: PokemonAbility) => state.ability
)
