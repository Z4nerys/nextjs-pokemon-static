//react primero
import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { useState } from "react"

//segundo next
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"

//tercero libreria de terceros
import confetti from 'canvas-confetti'

//cuarto mis importaciones
import { Layout } from "@/components/layouts"
import { pokeApi } from "@/api"
import { PokemonListResponse, PokemonResponse } from "@/interfaces"
import { getPokemonInfo, localFavorites } from "@/utils"

interface Props {
    pokemon: PokemonResponse
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if (!isInFavorites) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 100,
            angle: -160,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    //es importante poner el h1 en cada pagina ya que es mejor para el seo, como por ejemplo
    //en <Text h1 >{pokemon.name}</Text>
    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || "/no-image.pn"}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: "space-between" }}>
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                onPress={onToggleFavorite}
                            >
                                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites</Text>
                            <Container direction="row" display="flex" gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon/?limit=151`)

    /*  return{
       paths:[
         {
           params:{
             id:"1",
             name: "Bulbasaur"
           }
         },
       ],
       fallback: false
     } */
    //el params solo recibe strings.

    const pokemonNames : string[] = data.results.map(pokemon => pokemon.name)
    return {
        paths: pokemonNames.map( name => ({
            params: { name }
        })),
        fallback: false
        //el fallback es para que tire un 404 si no encuentra la pagina designada en los params: { id }
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByNamePage

// endpoint para el name
// `https://pokeapi.co/api/v2/pokemon/${name}`