export interface PokemonResponse {
  count: number
  next: null | string
  previous: null | string
  results: PokemonResponseResults[]
}

export interface PokemonResponseResults {
  name: string
  url: string
}

export interface PokemonDetails {
  pokemonProps?:any[]
}

export interface Common{
  pageSize: number
  pageIndex: number
  isLoading:Boolean
  isLoadingSuccess:Boolean
  isLoadingFailure:Boolean
  }
