import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { SimpleGrid, Text } from "@chakra-ui/react";
import axios, { AxiosError, CanceledError } from "axios";
import PokemonCard from "./PokemonCard";

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
}

interface FetchResults {
  name: string;
  url: string;
}

interface FetchPokemonResponse {
  count: number;
  results: FetchResults[];
}

const PokemonGrid = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const temp: Pokemon[] = [];
    const controller = new AbortController();

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
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={6} spacing={7}>
        {pokemon.map((mon) => (
          <PokemonCard key={mon.id} pokemon={mon} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default PokemonGrid;
