import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {
  getPokemonList,
  getPokemonListFailure,
  getPokemonListSuccess,
  getPokemonProps, getPokemonPropsSuccess
} from "../actions/pokemon-list.actions";
import {map, exhaustMap, catchError, mergeMap} from 'rxjs/operators';
import {forkJoin, of} from "rxjs";
import {PokemonDetails} from "../../models/pokemon-list.models";


@Injectable()
export class PokemonListEffects {
  constructor(
    private actions$: Actions,
    private pokemonListService: PokemonListService
  ) {
  }


  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonList),
      exhaustMap(action =>
        this.pokemonListService.getPokemonList(action.pageSize, action.pageIndex).pipe(
          map((response) => {
            return getPokemonListSuccess({response})
          }),
          catchError((error: any) => of(getPokemonListFailure(error))))
      )
    )
  );

  getPokemonProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonProps),
      exhaustMap(action =>
        this.pokemonListService.getPokemonProps(action.pokemonList).pipe(
          map((pokemonProps) => {
            console.log("response:::", pokemonProps)
            return getPokemonPropsSuccess({pokemonProps})
          }),
          catchError((error: any) => of(getPokemonListFailure(error))))
      )
    )
  );



}
