import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokemonListService} from "../../serrvices/pokemon-list.service";

@Injectable()
export class PokemonListEffects{
  constructor(
    private actions$: Actions,
    private pokemonListService:PokemonListService
  ) {}
getPokemonList$ = createEffect(()=>
this.actions$.pipe(
  ofType()
)

)
}
