import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {map, Observable, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDetailsComponent} from "../pokemon-details/pokemon-details.component";
import {select, Store} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  fetchPokemonList,
  fetchPokeProps,
  getPokemonList
} from "../../store/actions/pokemon-list.actions";
import {Common, PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {selectPokemonListProps, StateApp} from "../../store";


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit, AfterViewInit {

  loading$ = this.loader.loading$
  pokeList!: Observable<PokemonDetails[]>
  displayedColumns: string[] = ['id', 'name', 'image'];
  countPokemons: number = 0


  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent


  pokemons?: PokemonDetails[] = [];
  pokemonList?: PokemonResponse
  common!: Common
  pageSize: number = 5
  pageIndex: number = 0


  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService,
    public dialog: MatDialog,
    private readonly store: Store<StateApp>
  ) {
    this.store.select(selectPokemonListProps).subscribe(data => this.pokemons = data.pokemons)
    this.store.select(selectPokemonListProps).subscribe(data => this.pokemonList = data.pokemonList);
    this.store.select(selectPokemonListProps).subscribe(data => this.common = data.common);

    this.pageSize = this.common.pageSize
    this.pageIndex = this.common.pageIndex

  }


  ngOnInit(): void {
    this.pokemonListService.fetchData(this.pageSize, this.pageIndex)
    this.pokemonListService.pokeFetchInit$.subscribe(initPoke => {
      this.countPokemons = initPoke.count

      // this.store.dispatch(
      //   fetchPokemonList({payload: initPoke}))
      this.store.dispatch(getPokemonList({pageSize:this.pageSize, pageIndex:this.pageIndex}))
    })


    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$

    this.pokemonListService.pokeList$.subscribe(pokeProps => {
      this.store.dispatch(fetchPokeProps({payload: pokeProps}))
    })


    console.log(this.pokemonList)

  }

  ngAfterViewInit() {

  }

  handlePageEvent($event: PageEvent) {
    this.pageEvent = $event
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
//
    this.store.dispatch(changePageSize({pageSize: $event.pageSize}))
    this.store.dispatch(changePageIndex({pageIndex: $event.pageIndex}))

    this.store.dispatch(getPokemonList({pageSize:this.pageSize, pageIndex:this.pageIndex}))

//
    this.pokemonListService.fetchData(this.common.pageSize, this.common.pageIndex)
    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$



    this.pokemonListService.pokeList$.subscribe(pokeProps => {
      this.store.dispatch(fetchPokeProps({payload: pokeProps}))
    })
    console.log(this.pokemonList)
  }

  openDialog(row: any) {
    console.log(row)
    this.dialog.open(PokemonDetailsComponent, {data: row});
  }

}
