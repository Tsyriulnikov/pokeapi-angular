import {Injectable} from '@angular/core';
import {PokemonResponse} from "../models/pokemon-list.models";
import {environment} from "../../environments/environment";
import {BehaviorSubject, forkJoin, map, mergeMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  pokeList$ = new BehaviorSubject<any>([])
  pokeFetchInit$ = new BehaviorSubject<PokemonResponse[]>([])
  // countPokemons!: number

  constructor(private http: HttpClient) {
  }

  fetchData() {
    this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon/?offset=20&limit=20"`).pipe(
      mergeMap(pokemons => {
        const pokemonProps = pokemons.results.map(el => this.http.get(el.url))
        return forkJoin(pokemonProps)
      })
    ).subscribe(res => {
      this.pokeList$.next(res)
    })
  }

  // fetchData() {
  //   this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon/?offset=20&limit=20"`).pipe(
  //     mergeMap(pokemons => {
  //       const pokemonProps = pokemons.results.map(el => this.http.get(el.url))
  //       return forkJoin(pokemonProps)
  //     })
  //   ).subscribe(res => {
  //     this.pokeList$.next(res)
  //   })
  //
  // }


}
