import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {
  getPokemonAbility, getPokemonAbilitySuccess,
  getPokemonList,
  getPokemonListFailure,
  getPokemonListSuccess,
  getPokemonProps, getPokemonPropsSuccess
} from "../actions/pokemon-list.actions";
import {map, exhaustMap, catchError, mergeMap} from 'rxjs/operators';
import {forkJoin, from, of} from "rxjs";

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
        from([action.pokemonList])
          .pipe(
            mergeMap(pokemons => {
              const pokemonProps = pokemons.map(el => this.pokemonListService.getPokemonProps(el.url))
              return forkJoin(pokemonProps)
            }),
            map((pokemonProps) => {
              return getPokemonPropsSuccess({pokemonProps})
            }),
            catchError((error: any) => of(getPokemonListFailure(error))))
      )))

  getPokemonAbility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonAbility),
      exhaustMap(action =>
        this.pokemonListService.getPokemonAbility(action.urlAbility).pipe(
          map((pokemonAbility) => {
            return getPokemonAbilitySuccess({pokemonAbility})
          }),
          catchError((error: any) => of(getPokemonListFailure(error))))
      )
    )
  );


}
