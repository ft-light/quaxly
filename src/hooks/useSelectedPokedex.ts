import axios from "axios";
import { useState } from "react";

const useSelectedPokedex = () => {
  const [selectedPokedex, setSelectedPokedex] = useState(
    "https://pokeapi.co/api/v2/pokedex/1"
  );

  const clickEventFunction = async (url: string) => {
    const { data } = await axios.get(url);

    if (data.pokedexes.length === 0) return;

    setSelectedPokedex(data.pokedexes[0].url);
  };

  return { selectedPokedex, clickEventFunction };
};

export default useSelectedPokedex;
