import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosError, CanceledError } from "axios";

export interface PokemonType {
  slot: number;
  type: { name: string };
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

interface FetchResults {
  name: string;
  url: string;
}

interface FetchPokemonResponse {
  count: number;
  results: FetchResults[];
}

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const temp: Pokemon[] = [];
    const controller = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const { data } = await apiClient.get<FetchPokemonResponse>("/pokemon", {
          signal: controller.signal,
        });
        await data.results.reduce(async (a, res) => {
          await a;
          const poke = await axios.get<Pokemon>(res.url, {
            signal: controller.signal,
          });
          temp.push(poke.data);
        }, Promise.resolve());

        setPokemon(temp);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { pokemon, error, isLoading };
};

export default usePokemon;
