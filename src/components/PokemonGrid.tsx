import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";
import axios, { AxiosError, CanceledError } from "axios";

interface Pokemon {
  id: number;
  name: string;
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

        // await Promise.all(
        //   data.results.map(async (res) => {
        //     const poke = await axios.get<Pokemon>(res.url);
        //     setPokemon((prev) => [...prev, poke.data]);
        //   })
        // );

        // for (const res of data.results) {
        //   const poke = await axios.get<Pokemon>(res.url, {
        //     signal: controller.signal,
        //   });
        //   setPokemon((prev) => [...prev, poke.data]);
        // }
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
      <ul>
        {pokemon.map((mon) => (
          <li key={mon.id}>{mon.name}</li>
        ))}
      </ul>
    </>
  );
};

export default PokemonGrid;
