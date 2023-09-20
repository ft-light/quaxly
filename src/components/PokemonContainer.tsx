import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FetchResults } from "../hooks/useGeneration";
import PokemonGrid from "./PokemonGrid";

interface Props {
  selectedVersion: FetchResults[];
  selectedPokedex: string;
  showPokedex: (index: number) => void;
  isNational: boolean;
  tabIndex: number;
}

const PokemonContainer = ({
  selectedVersion,
  selectedPokedex,
  showPokedex,
  isNational,
  tabIndex,
}: Props) => {
  if (isNational) return <PokemonGrid selectedPokedex={selectedPokedex} />;
  return (
    <Tabs onChange={(i) => showPokedex(i)} index={tabIndex}>
      <TabList>
        {selectedVersion.map((v) => (
          <Tab key={v.name}>{v.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {selectedVersion.map((v) => (
          <TabPanel key={v.name} paddingX={0}>
            <PokemonGrid selectedPokedex={selectedPokedex} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PokemonContainer;
