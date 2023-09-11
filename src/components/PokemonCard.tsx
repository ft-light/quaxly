import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Pokemon } from "./PokemonGrid";
import PokemonTypeList from "./PokemonTypeList";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card width="200px" borderRadius={10}>
      <Image src={pokemon.sprites.other["official-artwork"].front_default} />
      <CardBody>
        <Heading fontSize="2xl">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Heading>
        <PokemonTypeList types={pokemon.types} />
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
