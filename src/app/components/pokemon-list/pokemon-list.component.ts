import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {PageEvent} from "@angular/material/paginator";
import {Observable, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PokemonDetailsComponent} from "../pokemon-details/pokemon-details.component";
import {select, Store} from "@ngrx/store";
import {
  changePageIndex,
  changePageSize,
  getPokemonList, getPokemonProps
} from "../../store/actions/pokemon-list.actions";
import {PokemonResponseResults} from "../../models/pokemon-list.models";
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
export class PokemonListComponent implements OnInit, OnDestroy {

  loading$ = this.loader.loading$

  private destroy$ = new Subject<void>();

  constructor(
    public loader: LoadingService,
    public dialog: MatDialog,
    private readonly store: Store<StateApp>,
  ) {
    this.store.pipe(select(selectPokemonProps), takeUntil(this.destroy$))
      .subscribe(data => this.pokemons = data)
    this.store.pipe(select(selectPokemonList), takeUntil(this.destroy$))
      .subscribe(data => this.store.dispatch(getPokemonProps({pokemonList: data})))
    this.store.pipe(select(selectPageSize), takeUntil(this.destroy$))
      .subscribe(data => this.pageSize = data)
    this.store.pipe(select(selectPageIndex), takeUntil(this.destroy$))
      .subscribe(data => this.pageIndex = data)
    this.countPokemons$ = this.store.pipe(select(selectQuantityPokemons))
  }

  ngOnInit(): void {
    this.store.dispatch(getPokemonList({pageSize: this.pageSize, pageIndex: this.pageIndex}))
  }

  handlePageEvent($event: PageEvent) {
    this.pageEvent = $event
    this.store.dispatch(changePageSize({pageSize: $event.pageSize}))
    this.store.dispatch(changePageIndex({pageIndex: $event.pageIndex}))
    this.store.dispatch(getPokemonList({pageSize: this.pageSize, pageIndex: this.pageIndex}))
  }

  openDialog(row: any) {
    this.dialog.open(PokemonDetailsComponent, {data: row, height:'90%', width:'70%', panelClass:'modalContainer'});
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
