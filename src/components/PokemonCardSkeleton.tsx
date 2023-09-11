import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const PokemonCardSkeleton = () => {
  return (
    <Card width="200px" borderRadius={10} overflow="hidden">
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default PokemonCardSkeleton;
