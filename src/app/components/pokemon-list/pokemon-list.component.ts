import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {map, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDetailsComponent} from "../pokemon-details/pokemon-details.component";
import {select, Store} from "@ngrx/store";
import {fetchPokemonList, fetchPokeProps} from "../../store/actions/pokemon-list.actions";
import {PokemonDetails, PokemonResponse} from "../../models/pokemon-list.models";
import {PokemonListState} from "../../store/reducers/pokemon-list.reducer";
import {selectPokemonListProps, StateApp} from "../../store";


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, AfterViewInit {

  loading$ = this.loader.loading$
  pokeList!: Observable<PokemonDetails[]>
  displayedColumns: string[] = ['id', 'name', 'image'];
  countPokemons: number = 0
  pageSize: number = 5
  pageIndex: number = 0
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent

  pokeList1!:any[]
  f=this.storeApp.select(selectPokemonListProps)

  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService,
    public dialog: MatDialog,
    private store: Store<PokemonListState>,
    private storeApp: Store<StateApp>

  ) {

  }

  ngOnInit(): void {
    this.pokemonListService.fetchData(this.pageSize, this.pageIndex)
    this.pokemonListService.pokeFetchInit$.subscribe(initPoke => {
      this.countPokemons = initPoke.count

      this.store.dispatch(
         fetchPokemonList({payload:initPoke}))
    })


    this.pokemonListService.fetchPokeProps()
    this.pokeList = this.pokemonListService.pokeList$

    this.pokemonListService.pokeList$.subscribe(pokeProps=>{
    this.store.dispatch(fetchPokeProps({payload:pokeProps}))
     })
// this.f.subscribe(item=>this.pokeList1!=item)

    // console.log(this.pokeList1)
  //   .subscribe(item=>{
  //   this.pokeList1!=item
  //   console.log(this.pokeList1)
  // })


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

    this.pokemonListService.pokeFetchInit$.subscribe(initPoke => {
      this.store.dispatch(fetchPokemonList({payload:initPoke}))
    })
    this.pokemonListService.pokeList$.subscribe(pokeProps=>{
      this.store.dispatch(fetchPokeProps({payload:pokeProps}))
    })
console.log(this.f)

  }

  openDialog(row: any) {
    console.log(row)
    this.dialog.open(PokemonDetailsComponent, {data: row});
  }

}
