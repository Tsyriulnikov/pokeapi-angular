import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PokemonResponse, PokemonResponseResults} from "../../models/pokemon-list.models";
import {forkJoin, map, mergeAll, mergeMap, Observable} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  loading$ = this.loader.loading$
  // pokemons!: PokemonResponseResults[]
  // pokemon!: any
  pokeList: any[] = []
  // pokeListPage!: Observable<any>

  displayedColumns: string[] = ['name', 'url'];

  constructor(public loader: LoadingService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  fetchData() {
    this.http.get<PokemonResponse>(`${environment.baseUrl}/pokemon`).pipe(
      mergeMap(pokemons => {
        const pokemonProps = pokemons.results.map(el => this.http.get(el.url))
        return forkJoin(pokemonProps)
      })
    ).subscribe(res => {
      this.pokeList = res
    })

  }
}
