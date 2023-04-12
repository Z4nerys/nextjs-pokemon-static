import { Link, Navbar, Text} from "@nextui-org/react"
import Image from "next/image"

export const Navbarc = () => {
  return (
    <Navbar css={{background:"$gray100"}} variant="static">
    <Navbar.Brand>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/244.png"
        alt="Icono de la app"
        width={82}
        height={82}
        priority={true}
        />
        <Link href="/">
          <Text color="white" h2>P</Text>
          <Text color="white" h3>okémon</Text>
        </Link>
    </Navbar.Brand>
    <Navbar.Content>
    <Navbar.Link href="/favorites">
      <Text color="white">
        Favoritos
      </Text>
    </Navbar.Link>
    </Navbar.Content>
  </Navbar>
  )
}
