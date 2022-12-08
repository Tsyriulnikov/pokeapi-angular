import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDetailsComponent} from "../pokemon-details/pokemon-details.component";
import {select, Store} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  getPokemonList, getPokemonProps
} from "../../store/actions/pokemon-list.actions";
import {Common, PokemonDetails, PokemonResponseResults} from "../../models/pokemon-list.models";
import {
  selectPageIndex,
  selectPageSize,
  selectPokemonList,
  selectPokemonProps,
  selectQuantityPokemons,
  StateApp
} from "../../store";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {

  loading$ = this.loader.loading$
  pokeList!: Observable<PokemonDetails[]>
  displayedColumns: string[] = ['id', 'name', 'image'];
  countPokemons$!: Observable<number>
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent
  pokemons?: any[];
  pokemonList!: PokemonResponseResults[]
  common!: Common
  pageSize!: number
  pageIndex!: number

  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService,
    public dialog: MatDialog,
    private readonly store: Store<StateApp>,
  ) {
    this.store.pipe(select(selectPokemonProps)).subscribe(data => this.pokemons = data)
    this.store.pipe(select(selectPokemonList)).subscribe(data => this.store.dispatch(getPokemonProps({pokemonList:data})))
    this.store.pipe(select(selectPageSize)).subscribe(data => this.pageSize = data)
    this.store.pipe(select(selectPageIndex)).subscribe(data => this.pageIndex = data)
    this.countPokemons$ = this.store.pipe(select(selectQuantityPokemons))
  }

  ngOnInit(): void {
     this.store.dispatch(getPokemonList({pageSize:this.pageSize, pageIndex:this.pageIndex}))
  }

  handlePageEvent($event: PageEvent) {
    this.pageEvent = $event
    this.store.dispatch(changePageSize({pageSize: $event.pageSize}))
    this.store.dispatch(changePageIndex({pageIndex: $event.pageIndex}))
    this.store.dispatch(getPokemonList({pageSize:this.pageSize, pageIndex:this.pageIndex}))
  }

  openDialog(row: any) {
    this.dialog.open(PokemonDetailsComponent, {data: row});
  }
}
