import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoadingService} from "../../serrvices/loading.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PokemonListService} from "../../serrvices/pokemon-list.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading$ = this.loader.loading$
  pokeList!: Observable<any>
  displayedColumns: string[] = ['name', 'url'];
  countPokemons: number = 0
  pageSize: number = 10
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent

  constructor(
    public loader: LoadingService,
    private pokemonListService: PokemonListService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }


  fetchData() {
    // this.countPokemons = this.pokemonListService.countPokemons
    this.pokemonListService.fetchData()
    this.pokeList = this.pokemonListService.pokeList$

    console.log(this.countPokemons)
  }
}
