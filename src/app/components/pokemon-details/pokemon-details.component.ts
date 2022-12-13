import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {selectAbility, selectQuantityPokemons, StateApp} from "../../store";
import {getPokemonAbility} from "../../store/actions/pokemon-list.actions";
import {Observable} from "rxjs";
import {PokemonAbility} from "../../models/pokemon-list.models";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  ability$!: Observable<PokemonAbility>

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
    private readonly store: Store<StateApp>
  ) {

    this.ability$ = this.store.pipe(select(selectAbility.effect_entries[0].))


  }

  ngOnInit(): void {
    this.store.dispatch(getPokemonAbility({urlAbility: this.data.abilities[0].ability.url}))
  }

}
