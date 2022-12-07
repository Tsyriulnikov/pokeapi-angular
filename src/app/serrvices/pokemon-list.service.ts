import {Injectable} from '@angular/core';
import {PokemonDetails, PokemonResponse} from "../models/pokemon-list.models";
import {environment} from "../../environments/environment";
import {BehaviorSubject, forkJoin, mergeMap, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  pokeList$ = new BehaviorSubject<PokemonDetails[]>([])
  countPokemons!: number
  pokeFetchInit$!: Observable<PokemonResponse>

  constructor(private http: HttpClient) {
  }

  fetchData(limit: number, pageIndex: number) {
    const offset = pageIndex * limit
    this.pokeFetchInit$ =
      this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon/?offset=${offset}&limit=${limit}"`)
  }

  fetchPokeProps() {
    this.pokeFetchInit$
      .pipe(
        mergeMap(pokemons => {
          const pokemonProps = pokemons.results.map(el => this.http.get<PokemonDetails>(el.url))
          return forkJoin(pokemonProps)
        })
      ).subscribe(res => {
      this.pokeList$.next(res)
    })
  }

  getPokemonList(pageSize: number, pageIndex: number) {
    const offset = pageIndex * pageSize
    return this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon/?offset=${offset}&limit=${pageSize}"`)
  }

  getPokemonProps(url: string) {
    return this.http.get<PokemonDetails[]>(url)
  }


}
