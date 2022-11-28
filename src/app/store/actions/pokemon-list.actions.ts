import {Action} from "@ngrx/store";


export enum PokemonListActionTypes {
  FetchPokemonList = '[PokemonList] FetchPokemonList'
}

export class FetchPokemonList implements Action {
  readonly type = PokemonListActionTypes.FetchPokemonList;

//   constructor(public payload: PokemonResponse) {}
}

export type PokemonListActions = FetchPokemonList
