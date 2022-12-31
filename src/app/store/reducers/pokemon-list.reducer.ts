import {Common, PokemonAbility, PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {Action, createReducer, on} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize, getPokemonAbility, getPokemonAbilitySuccess,
  getPokemonList,
  getPokemonListSuccess, getPokemonProps, getPokemonPropsSuccess
} from "../actions/pokemon-list.actions";

export interface PokemonListState {
  pokemonList: PokemonResponse,
  pokemonDetails: PokemonDetails,
  common: Common,
  pokemonAbility: PokemonAbility,
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
  },
  pokemonAbility: {
    ability: {
      effect_entries: [{
        effect: '',
        language: {
          name: '',
          url: '',
        },
      }]
    }
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

//Get ability pokemons
  on(getPokemonAbility, (state) => ({...state, common: {...state.common, isLoading: true}})),
  on(getPokemonAbilitySuccess, (state, {pokemonAbility}) => ({
    ...state,
    pokemonAbility: {ability: pokemonAbility},
    common: {...state.common, isLoading: false, isLoadingSuccess: true},
  })),
)


export function reducer(state: PokemonListState | undefined, action: Action): any {
  return pokemonListReducer(state, action);
}
