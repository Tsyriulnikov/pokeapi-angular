import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {PokemonListService} from "../../serrvices/pokemon-list.service";


@Injectable()
export class PokemonListEffects{
  constructor(
    private actions$: Actions,
    private pokemonListService:PokemonListService
  ) {
  }
}
