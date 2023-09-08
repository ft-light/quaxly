import { Grid, GridItem, Show } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import PokemonGrid from "./components/PokemonGrid"

function App() {

  return (
    <Grid templateAreas={{
      base: `'nav' 'main'`,
      lg: `'nav nav' 'aside main'`
    }}>
      <GridItem area='nav' p='10px'>
        <NavBar />
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside'>Aside</GridItem>
      </Show>
      <GridItem area='main'>
        <PokemonGrid />
      </GridItem>
    </Grid>
  )
}

export default App
