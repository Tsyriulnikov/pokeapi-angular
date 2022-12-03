import {Common, PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {createReducer, on} from "@ngrx/store";
import {fetchPokemonList, fetchPokeProps, getPokemonList, getPokemonListSuccess} from "../actions/pokemon-list.actions";

export interface PokemonListState {
  pokemonList: PokemonResponse,
  pokemonDetails: PokemonDetails,
  common:Common
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
  common:{
    isLoading:false,
    isLoadingSucces:false,
    isLoadingFailure:false
  }


}

export const pokemonListReducer = createReducer(
  pokemonListInitialState,
  on(fetchPokemonList, (state, {payload}) => ({...state, pokemonList: payload})),
  on(fetchPokeProps, (state, {payload}) => ({...state, pokemonDetails: {pokemonProps: payload}})),

//Get pokemonList
on(getPokemonList,(state)=>({...state,common:{isLoading: true}})),
on(getPokemonListSuccess,(state,{payload}) => ({...state, pokemonDetails: {pokemonProps: payload}}))
)

export const getPokemons = (state: PokemonListState) => {
  return {
    pokemons: state.pokemonDetails.pokemonProps
  }
}
