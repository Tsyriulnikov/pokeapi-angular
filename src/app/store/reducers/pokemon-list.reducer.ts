import {Common, PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {Action, createReducer, on} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  getPokemonList,
  getPokemonListSuccess, getPokemonProps, getPokemonPropsSuccess
} from "../actions/pokemon-list.actions";

export interface PokemonListState {
  pokemonList: PokemonResponse,
  pokemonDetails: PokemonDetails,
  common: Common
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
  },
  common: {
    pageSize: 5,
    pageIndex: 0,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
  }
}

export const pokemonListReducer = createReducer(
  pokemonListInitialState,

//Get pokemonList
  on(getPokemonList, (state) => ({...state, common: {...state.common, isLoading: true}})),
  on(getPokemonListSuccess, (state, {response}) => ({
    ...state,
    pokemonList: response,
    common: {...state.common, isLoading: false, isLoadingSuccess: true}
  })),

// Get pokemonProps
  on(getPokemonProps, (state) => ({...state, common: {...state.common, isLoading: true}})),
  on(getPokemonPropsSuccess, (state, {pokemonProps}) => ({
    ...state,
    pokemonDetails: {pokemonProps: pokemonProps},
    common: {...state.common, isLoading: false, isLoadingSuccess: true}
  })),

//Change Page List
  on(changePageSize, (state, {pageSize}) => ({...state, common: {...state.common, pageSize: pageSize}})),
  on(changePageIndex, (state, {pageIndex}) => ({...state, common: {...state.common, pageIndex: pageIndex}}))
)

export function reducer(state: PokemonListState | undefined, action: Action): any {
  return pokemonListReducer(state, action);
}
