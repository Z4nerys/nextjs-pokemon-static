import { NextPage, GetStaticProps } from "next"
import { Grid} from "@nextui-org/react";
import { Layout } from "@/components/layouts"
import { pokeApi } from "@/api"
import { PokemonListResponse, SmallPokemon } from "@/interfaces"
import { PokemonCard } from "@/components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

// en una etiqueta aptreto espacio luego ctrl + espacio y me muestra las opciones de la etiqueta
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Lista de pokemones">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}


//esto se puede ejecutar solo del lado del servidor
//la unica info que le llega al cliente es la de los props
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  data.results.forEach((pokemon, i) => {
    pokemon.id = i + 1
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  });

  return {
    props: {
      pokemons: data.results
    }
  }
}

export default HomePage