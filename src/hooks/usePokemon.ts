import useData, { Name } from "./useData";

export interface PokemonType {
  slot: number;
  type: Name;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

const usePokemon = () => useData<Pokemon>("/pokemon");

export default usePokemon;
