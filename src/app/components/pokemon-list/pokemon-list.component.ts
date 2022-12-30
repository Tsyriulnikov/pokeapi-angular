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
  displayedColumns: string[] = ['id', 'name', 'image'];
  countPokemons$!: Observable<number>
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent
  pokemons?: any[];
  pokemonList!: PokemonResponseResults[]
  pageSize!: number
  pageIndex!: number
  private destroy$ = new Subject<void>();

  constructor(
    public loader: LoadingService,
    public dialog: MatDialog,
    private readonly store: Store<StateApp>,
  ) {

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
