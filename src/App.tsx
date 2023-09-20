import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenerationList from "./components/GenerationList";
import PokemonContainer from "./components/PokemonContainer";
import useVersion from "./hooks/useVersion";

function App() {
  const {
    selectedVersion,
    getPokedexes,
    selectedPokedex,
    showPokedex,
    isNational,
    getDefaultPokedex,
  } = useVersion();

  return (
    <Grid
      templateAreas={{
        base: `'nav' 'main'`,
        lg: `'nav nav' 'aside main'`,
      }}
      templateColumns="220px 1fr"
    >
      <GridItem area="nav" p="10px">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" p="10px">
          <GenerationList
            getPokedexes={getPokedexes}
            isNational={isNational}
            getDefaultPokedex={getDefaultPokedex}
          />
        </GridItem>
      </Show>
      <GridItem area="main" p="10px">
        <PokemonContainer
          selectedVersion={selectedVersion}
          selectedPokedex={selectedPokedex}
          showPokedex={showPokedex}
          isNational={isNational}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
