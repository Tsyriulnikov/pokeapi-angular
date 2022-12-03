import {createAction, props} from "@ngrx/store";
import {PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";

export const GET_POKEMON_LIST = '[PokemonList] Get Pokemon List'
export const GET_POKEMON_LIST_SUCCESS = '[PokemonList] Get Pokemon List Success'


export const fetchPokemonList = createAction(
  '[PokemonList] FetchPokemonList',
  props<{ payload: PokemonResponse }>()
)
export const fetchPokeProps = createAction(
  '[PokemonList] FetchPokeProps',
  props<{ payload: PokemonDetails[] }>()
)

//Get PokemonList
export const getPokemonList = createAction(
  GET_POKEMON_LIST
)
export const getPokemonListSuccess = createAction(
  GET_POKEMON_LIST_SUCCESS
)
