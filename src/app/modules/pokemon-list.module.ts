import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonListComponent} from "../components/pokemon-list/pokemon-list.component";



@NgModule({
  declarations: [PokemonListComponent],
  exports: [
    PokemonListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PokemonListModule { }
