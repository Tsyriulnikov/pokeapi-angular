import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PokemonListModule} from "./modules/pokemon-list.module";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NetworkInterceptor} from "./interceptors/network.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducers} from "./store";
import { EffectsModule } from '@ngrx/effects';
import {PokemonListEffects} from "./store/effects";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PokedexComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokemonListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([PokemonListEffects]),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:NetworkInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
