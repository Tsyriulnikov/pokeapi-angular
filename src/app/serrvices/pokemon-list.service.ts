import {Injectable} from '@angular/core';
import {PokemonAbility, PokemonDetails, PokemonResponse} from "../models/pokemon-list.models";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  pokeList$ = new BehaviorSubject<PokemonDetails[]>([])
  pokeFetchInit$!: Observable<PokemonResponse>

  constructor(private http: HttpClient) {
  }

  getPokemonList(pageSize: number, pageIndex: number) {
    const offset = pageIndex * pageSize
    return this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon/?offset=${offset}&limit=${pageSize}"`)
  }

  getPokemonProps(url: string) {
    return this.http.get<PokemonDetails[]>(url)
  }
  getPokemonAbility(url: string) {
    return this.http.get<PokemonAbility>(url)
  }

}
