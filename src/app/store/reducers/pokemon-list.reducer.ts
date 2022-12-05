import {Common, PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {createReducer, on} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  fetchPokemonList,
  fetchPokeProps,
  getPokemonList,
  getPokemonListSuccess
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
  on(fetchPokemonList, (state, {payload}) => ({...state, pokemonList: payload})),
  on(fetchPokeProps, (state, {payload}) => ({...state, pokemonDetails: {pokemonProps: payload}})),

//Get pokemonList

  on(getPokemonList, (state) => ({...state, common: {...state.common, isLoading: true}})),
  on(getPokemonListSuccess, (state, {response}) => ({
    ...state,
    pokemonList: response,
    common: {...state.common, isLoading: false, isLoadingSuccess: true}
  })),

//Change Page List
  on(changePageSize, (state, {pageSize}) => ({...state, common: {...state.common, pageSize: pageSize}})),
  on(changePageIndex, (state, {pageIndex}) => ({...state, common: {...state.common, pageIndex: pageIndex}}))
)

export const getPokemons = (state: PokemonListState) => {
  return {
    pokemons: state.pokemonDetails.pokemonProps,
    pokemonList: state.pokemonList,
    common: state.common
  }
}
