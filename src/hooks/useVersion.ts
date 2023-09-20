import axios from "axios";
import { useState } from "react";
import { FetchResults } from "./useGeneration";

interface VersionGroup {
  pokedexes: FetchResults[];
}

const useVersion = () => {
  const defaultp = "https://pokeapi.co/api/v2/pokedex/1";
  const [selectedVersion, setSelectedVersion] = useState<FetchResults[]>([]);
  const [selectedPokedex, setSelectedPokedex] = useState(defaultp);
  const [isNational, setIsNational] = useState(true);

  const getPokedexes = async (url: string) => {
    const { data } = await axios.get<VersionGroup>(url);

    if (data.pokedexes.length === 0) return;

    setSelectedPokedex(data.pokedexes[0].url);
    setSelectedVersion(data.pokedexes);
    setIsNational(false);
  };

  const showPokedex = (url: string) => {
    setSelectedPokedex(url);
  };

  const getDefaultPokedex = () => {
    setSelectedPokedex(defaultp);
    setIsNational(true);
  };

  return {
    selectedVersion,
    getPokedexes,
    selectedPokedex,
    showPokedex,
    isNational,
    getDefaultPokedex,
  };
};

export default useVersion;
