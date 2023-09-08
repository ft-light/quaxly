import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { Text } from "@chakra-ui/react"

interface Pokemon {
  name: 'string'
}

interface FetchPokemonResponse {
  count: number,
  results: Pokemon[]
}

const PokemonGrid = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    apiClient.get<FetchPokemonResponse>('/pokemon')
      .then(res => setPokemon(res.data.results))
      .catch(err => setError(err.message))
  })

  return (
    <>
      {error && <Text>{ error }</Text>}
      <ul>
        { pokemon.map(mon => <li key={ mon.name }>{ mon.name }</li>)}
      </ul>
    </>
  )
}

export default PokemonGrid