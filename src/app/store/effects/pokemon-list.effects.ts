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
export class PokemonListEffects{
  constructor(
    private actions$: Actions,
    private pokemonListService:PokemonListService
  ) {}


  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonList),
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

  getPokemonProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonProps),
      exhaustMap(action =>


        this.pokemonListService.getPokemonProps(action.pokemonList).pipe(
          map((response) => {
            console.log("response:::", response)
            return getPokemonPropsSuccess({response})
          }),
          catchError((error: any) => of(getPokemonListFailure(error))))
      )
    )
  );






        // action.pokemonList.pipe(
        //     mergeMap(pokemons => {
        //       const pokemonProps = pokemons.results.map(el => this.http.get<PokemonDetails>(el.url))
        //       return forkJoin(pokemonProps)
        //     })
        //   ).subscribe(res => {
        //   this.pokeList$.next(res)
        // })






        // this.pokemonListService.getPokemonProps(action.pokemonList.results[0].url).pipe(
  //       this.pokemonListService.getPokemonProps(action.pokemonList).pipe(
  //         map((response) => {
  //           console.log("response:::", response)
  //           return getPokemonPropsSuccess({response})
  //         }),
  //         catchError((error: any) => of(getPokemonListFailure(error))))
  //     )
  //   )
  // );

}
