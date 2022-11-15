export interface PokemonResponse {
  count: number,
  next: null | string,
  previous: null | string,
  results: PokemonResponseResults[]
}

export interface PokemonResponseResults {
  name: string,
  url: string
}
