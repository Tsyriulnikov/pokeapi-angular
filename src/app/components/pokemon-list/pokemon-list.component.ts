import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {from, map, Observable, of, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDetailsComponent} from "../pokemon-details/pokemon-details.component";
import {select, Store} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  fetchPokemonList,
  fetchPokeProps,
  getPokemonList, getPokemonProps
} from "../../store/actions/pokemon-list.actions";
import {Common, PokemonDetails, PokemonResponse, PokemonResponseResults} from "../../models/pokemon-list.models";
import {selectPageIndex, selectPageSize, selectPokemonList, selectPokemonProps, StateApp} from "../../store";



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
  pokemonList!: PokemonResponseResults[]
  pokemonList$!:Observable<PokemonResponse>
  common!: Common
  pageSize: number = 5
  pageIndex: number = 0


  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService,
    public dialog: MatDialog,
    private readonly store: Store<StateApp>
  ) {
    this.store.pipe(select(selectPokemonProps)).subscribe(data => this.pokemons = data)
    this.store.pipe(select(selectPokemonList)).subscribe(data => this.pokemonList = data)
    this.store.pipe(select(selectPageSize)).subscribe(data => this.pageSize = data)
    this.store.pipe(select(selectPageIndex)).subscribe(data => this.pageIndex = data)

    //
// this.pokemonList$ =this.store.select(selectPokemonListProps)


//
  }


  ngOnInit(): void {
    this.pokemonListService.fetchData(this.pageSize, this.pageIndex)
    this.pokemonListService.pokeFetchInit$.subscribe(initPoke => {
      this.countPokemons = initPoke.count



    })


    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$

    this.pokemonListService.pokeList$.subscribe(pokeProps => {
      this.store.dispatch(fetchPokeProps({payload: pokeProps}))
    })


    this.store.dispatch(getPokemonList({pageSize:this.pageSize, pageIndex:this.pageIndex}))

    // this.store.dispatch(getPokemonProps({pokemonList:this.pokemonList.results[0].url}))

    // this.store.subscribe(()=> this.store.dispatch(getPokemonProps({pokemonList:this.pokemonList?.results})))
    // console.log(this.pokemonList)


// this.pokemonList$.subscribe(data=>this.store.dispatch(getPokemonProps(data)))
//     this.pokemonList$.subscribe()

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
    // console.log(this.pokemonList)
  }

  openDialog(row: any) {
    console.log(row)
    this.dialog.open(PokemonDetailsComponent, {data: row});
  }

}
