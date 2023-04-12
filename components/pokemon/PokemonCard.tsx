import { FC } from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { SmallPokemon } from '../../interfaces/pokemon-list';

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon: { id, name, img } }) => {

    const router = useRouter()

    const onClick = () => {
        //sirve mas las url con name para el SEO
        router.push(`/name/${name}`)
    }
    
    return (
        <Grid xs={6} sm={3} md={2} xl={1}>
            <Card 
                isHoverable 
                isPressable 
                onClick={onClick}
            >
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={img}
                        alt={name}
                        width="100%"
                        height="140px"
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text>#{id}</Text>
                        <Text transform="capitalize">{name}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
