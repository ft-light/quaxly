import { SimpleGrid, Text } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import PokemonCardSkeleton from "./PokemonCardSkeleton";
import usePokemon from "../hooks/usePokemon";

const PokemonGrid = () => {
  const { data, error, isLoading } = usePokemon();
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
