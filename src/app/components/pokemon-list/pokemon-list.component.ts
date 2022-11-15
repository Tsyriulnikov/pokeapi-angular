import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
loading$ = this.loader.loading$
  constructor(public loader:LoadingService, private  http:HttpClient) { }

  ngOnInit(): void {
  }
fetchData(){
  this.http
    .get(`${environment.baseUrl}/pokemon`)
    .subscribe((res)=>{
      console.log(res)
    });
}
}
