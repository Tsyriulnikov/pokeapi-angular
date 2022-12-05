import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {getPokemonList, getPokemonListFailure, getPokemonListSuccess} from "../actions/pokemon-list.actions";
import {map, exhaustMap, catchError, mergeMap} from 'rxjs/operators';
import {of} from "rxjs";


@Injectable()
export class PokemonListEffects{
  constructor(
    private actions$: Actions,
    private pokemonListService:PokemonListService
  ) {}


  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonList),
      // exhaustMap(action =>
      exhaustMap(action =>
      this.pokemonListService.getPokemonList(action.pageSize, action.pageIndex).pipe(
          map((response) => {
            console.log("response:::", response)
            return getPokemonListSuccess({response})
          }),
          catchError((error: any) => of(getPokemonListFailure(error))))
      )
    )
  );




}
