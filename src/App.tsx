import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PokemonGrid from "./components/PokemonGrid";
import GenerationList from "./components/GenerationList";

function App() {
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
          <GenerationList />
        </GridItem>
      </Show>
      <GridItem area="main" p="10px">
        <PokemonGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
