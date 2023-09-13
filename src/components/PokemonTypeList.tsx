import { HStack, Text } from "@chakra-ui/react";
import { PokemonType } from "../hooks/usePokedex";

interface Props {
  types: PokemonType[];
}

const PokemonTypeList = ({ types }: Props) => {
  const typeColorMap: { [key: string]: string } = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return (
    <HStack>
      {types.map((type) => (
        <Text
          as="b"
          key={type.slot}
          color={typeColorMap[type.type.name]}
          fontSize="xs"
        >
          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
        </Text>
      ))}
    </HStack>
  );
};

export default PokemonTypeList;
