import axios from "axios";
import { useState } from "react";
import { FetchResults } from "./useGeneration";

interface VersionGroup {
  pokedexes: FetchResults[];
}

const useVersion = () => {
  const [selectedVersion, setSelectedVersion] = useState<FetchResults[]>([]);
  const [selectedPokedex, setSelectedPokedex] = useState(
    "https://pokeapi.co/api/v2/pokedex/1"
  );

  const getPokedexes = async (url: string) => {
    const { data } = await axios.get<VersionGroup>(url);

    if (data.pokedexes.length === 0) return;

    setSelectedPokedex(data.pokedexes[0].url);
    setSelectedVersion(data.pokedexes);
  };

  const showPokedex = (url: string) => {
    setSelectedPokedex(url);
  };

  return {
    selectedVersion,
    getPokedexes,
    selectedPokedex,
    showPokedex,
  };
};

export default useVersion;
