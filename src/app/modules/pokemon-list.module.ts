import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonListComponent} from "../components/pokemon-list/pokemon-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [PokemonListComponent],
  exports: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class PokemonListModule { }
