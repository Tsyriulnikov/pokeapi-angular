import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, AfterViewInit {

  loading$ = this.loader.loading$
  pokeList!: Observable<any>
  displayedColumns: string[] = ['name', 'url'];
  countPokemons: number = 0
  pageSize: number = 5
  pageIndex: number = 0
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent

  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService) {
  }

  ngOnInit(): void {
    this.pokemonListService.fetchData(this.pageSize, this.pageIndex)
    this.pokemonListService.pokeFetchInit$.subscribe(initPoke => {
      this.countPokemons = initPoke.count
    })
    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$
  }

  ngAfterViewInit() {

  }

  handlePageEvent($event: PageEvent) {
    this.pageEvent = $event
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
    this.pokemonListService.fetchData(this.pageSize, this.pageIndex)
    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$
  }
}
