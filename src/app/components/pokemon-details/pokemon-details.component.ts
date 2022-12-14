import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {selectAbility, selectPokemonProps, selectQuantityPokemons, StateApp} from "../../store";
import {getPokemonAbility} from "../../store/actions/pokemon-list.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {PokemonAbility} from "../../models/pokemon-list.models";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  ability$!: Observable<PokemonAbility>
  private destroy$ = new Subject<void>()
  ability?: any
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      sprites: { front_default: string },
      id: string,
      abilities: [
        {
          ability: {
            name: string,
            url: string
          },
          is_hidden: boolean,
          slot: number
        }],
    },
    private readonly store: Store<StateApp>,

  ) {

    // this.ability$ = this.store.pipe(select(selectAbility.effect_entries[0].))
    this.store.pipe(select(selectAbility), takeUntil(this.destroy$))
      .subscribe(data => this.ability = data)

  }

  ngOnInit(): void {
    this.store.dispatch(getPokemonAbility({urlAbility: this.data.abilities[0].ability.url}))
  }
  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
