import {Action, createAction, props} from "@ngrx/store";
import {PokemonResponse} from "../../models/pokemon-list.models";


export const fetchPokemonList = createAction(
  '[PokemonList] FetchPokemonList',
  props<{ payload: PokemonResponse }>()
)
