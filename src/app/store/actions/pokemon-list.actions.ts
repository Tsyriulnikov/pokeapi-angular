import {createAction, props} from "@ngrx/store";
import {PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";


export const fetchPokemonList = createAction(
  '[PokemonList] FetchPokemonList',
  props<{ payload: PokemonResponse }>()
)
export const fetchPokeProps = createAction(
  '[PokemonList] FetchPokeProps',
  props<{ payload: PokemonDetails[]}>()
)
