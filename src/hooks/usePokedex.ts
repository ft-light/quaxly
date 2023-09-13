import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosError, CanceledError } from "axios";

export interface Name {
  name: string;
}

interface Language {
  language: Name;
  name: string;
}

interface FetchResults {
  url: string;
}

interface FetchResponse {
  id: number;
  names: Language[];
  pokemon_entries: {
    entry_number: number;
    pokemon_species: FetchResults;
  }[];
}

interface PokemonSpecies {
  id: number;
  names: Language[];
  varieties: {
    is_default: boolean;
    pokemon: FetchResults;
  }[];
}

interface Pokemon {
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

interface PokemonType {
  slot: number;
  type: Name;
}

const usePokedex = (endpoint: string) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const temp: Pokemon[] = [];
    const controller = new AbortController();
    const signal = {
      signal: controller.signal,
    };
    setIsLoading(true);

    (async () => {
      try {
        const { data } = await apiClient.get<FetchResponse>(endpoint, signal);
        await data.pokemon_entries.slice(0, 20).reduce(async (a, res) => {
          await a;

          const { data: s } = await axios.get<PokemonSpecies>(
            res.pokemon_species.url,
            signal
          );

          const defaultp = s.varieties.filter((variety) => variety.is_default);

          const { data: p } = await axios.get<Pokemon>(
            defaultp[0].pokemon.url,
            signal
          );

          temp.push(p);
        }, Promise.resolve());

        setData(temp);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default usePokedex;
