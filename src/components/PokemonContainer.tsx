import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { FetchResults } from "../hooks/useGeneration";
import PokemonGrid from "./PokemonGrid";

interface Props {
  selectedVersion: FetchResults[];
  selectedPokedex: string;
  showPokedex: (url: string) => void;
}

const PokemonContainer = ({
  selectedVersion,
  selectedPokedex,
  showPokedex,
}: Props) => {
  return (
    <Tabs onChange={(i) => showPokedex(selectedVersion[i].url)}>
      <TabList>
        {selectedVersion.map((v) => (
          <Tab key={v.name}>{v.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {selectedVersion.map((v) => (
          <PokemonGrid
            key={v.name}
            selectedVersion={selectedVersion}
            selectedPokedex={selectedPokedex}
          />
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PokemonContainer;
