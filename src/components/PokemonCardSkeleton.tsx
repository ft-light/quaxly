import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const PokemonCardSkeleton = () => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Skeleton height="172px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default PokemonCardSkeleton;
