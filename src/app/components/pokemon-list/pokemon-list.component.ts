import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PokemonResponse, PokemonResponseResults} from "../../models/pokemon-list.models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
loading$ = this.loader.loading$
pokemons!:PokemonResponseResults[]
  displayedColumns: string[] = ['name', 'url'];
  constructor(public loader:LoadingService, private  http:HttpClient) { }

  ngOnInit(): void {
  }
fetchData(){
  this.http
    .get<PokemonResponse>(`${environment.baseUrl}/pokemon`)
    .subscribe((res)=>{
      this.pokemons = res.results
      console.log(res.results)
    });
}
}
