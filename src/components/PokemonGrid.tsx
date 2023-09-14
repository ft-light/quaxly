import { SimpleGrid, Text } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import PokemonCardSkeleton from "./PokemonCardSkeleton";
import usePokedex from "../hooks/usePokedex";

interface Props {
  selectedPokedex: string;
}

const PokemonGrid = ({ selectedPokedex }: Props) => {
  const { data, error, isLoading } = usePokedex(selectedPokedex, [
    selectedPokedex,
  ]);
  const skeletons = [...Array(20).keys()];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={6} spacing={5}>
        {isLoading && skeletons.map((i) => <PokemonCardSkeleton key={i} />)}
        {data.map((mon) => (
          <PokemonCard key={mon.id} pokemon={mon} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default PokemonGrid;
