import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import PokemonTypeList from "./PokemonTypeList";
import { Pokemon } from "../hooks/usePokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card borderRadius={10} p={3}>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <CardBody p={0}>
        <Text as="b" fontSize="xs" color="gray.500">
          #{pokemon.id}
        </Text>
        <Heading fontSize="lg">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Heading>
        <PokemonTypeList types={pokemon.types} />
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
