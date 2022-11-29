import {Action} from "@ngrx/store";
import {PokemonResponse} from "../../models/pokemon-list.models";


export enum PokemonListActionTypes {
  FetchPokemonList = '[PokemonList] FetchPokemonList'
}

export class FetchPokemonList implements Action {
  readonly type = PokemonListActionTypes.FetchPokemonList;

  constructor(public payload: any) {}
}

export type PokemonListActions = FetchPokemonList
