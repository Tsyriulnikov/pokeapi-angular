import {createAction, props} from "@ngrx/store";
import {PokemonDetails, PokemonResponse, PokemonResponseResults} from "../../models/pokemon-list.models";

export const GET_POKEMON_LIST = '[PokemonList] Get Pokemon List'
export const GET_POKEMON_LIST_SUCCESS = '[PokemonList] Get Pokemon List Success'
export const GET_POKEMON_LIST_FAILURE = '[PokemonList] Get Pokemon List Failure'
export const GET_POKEMON_PROPS = '[PokemonProps] Get Pokemon Props'
export const GET_POKEMON_PROPS_SUCCESS = '[PokemonProps] Get Pokemon Props Success'
export const CHANGE_PAGE_SIZE = '[PokemonPage] Change Pokemon List Page'
export const CHANGE_PAGE_INDEX = '[PokemonPage] Change Pokemon List Index'


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
  GET_POKEMON_LIST,
  props<{pageSize:number, pageIndex:number}>()
)
export const getPokemonListSuccess = createAction(
  GET_POKEMON_LIST_SUCCESS,
  props<{ response: PokemonResponse }>()
)

export const getPokemonListFailure = createAction(
  GET_POKEMON_LIST_FAILURE,
  props<any>()
)

// Change pageSize & pageIndex
export const changePageSize = createAction(
  CHANGE_PAGE_SIZE,
  props<{ pageSize: number }>()
)
export const changePageIndex = createAction(
  CHANGE_PAGE_INDEX,
  props<{ pageIndex: number }>()
)

// Get PokemonProps
export const getPokemonProps = createAction(
  GET_POKEMON_PROPS,
  // props<{pokemonList:PokemonResponse}>()
  props<{pokemonList:PokemonResponseResults[]}>()
)
export const getPokemonPropsSuccess = createAction(
  GET_POKEMON_PROPS_SUCCESS,
  props<{pokemonProps:any}>()
)
