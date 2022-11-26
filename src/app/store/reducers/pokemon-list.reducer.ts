import {PokemonResponse} from "../../models/pokemon-list.models";

export interface PokemonState {
pokemonList:PokemonResponse
}

const pokemonListIntialState:PokemonState={
  pokemonList:{
    count: 0,
    next: null,
    previous: null ,
    results: []
  }
}

export function pokemonListReducer(
  state:State= = initialState,
  action:
){

}
