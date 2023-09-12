import { HStack, List, ListItem, Text } from "@chakra-ui/react";
import useGeneration from "../hooks/useGeneration";
import VersionGroupList from "./VersionGroupList";

const GenerationList = () => {
  const { generation } = useGeneration();

  return (
    <List spacing={2}>
      {generation
        .map((gen) => (
          <ListItem key={gen.id}>
            <HStack fontSize="xs">
              <Text as="b" color="cyan.500">
                {gen.names
                  .find(({ language }) => language.name === "en")
                  ?.name.toUpperCase()}
              </Text>
              <Text as="b" color="gray.500">
                (
                {gen.main_region.name.charAt(0).toUpperCase() +
                  gen.main_region.name.slice(1)}
                )
              </Text>
            </HStack>
            <List paddingLeft={2}>
              <VersionGroupList version={gen.version_groups} />
            </List>
          </ListItem>
        ))
        .reverse()}
    </List>
  );
};

export default GenerationList;