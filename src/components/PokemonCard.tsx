import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Pokemon } from "./PokemonGrid";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card borderRadius={10}>
      <Image src={pokemon.sprites.other["official-artwork"].front_default} />
      <CardBody>
        <Heading fontSize="2xl">{pokemon.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
