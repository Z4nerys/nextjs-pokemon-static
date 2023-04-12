import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbarc } from "../ui";

type Props = {
    children: ReactNode;
    title?: string;
};
// o la otra opcion es:
/*
interface Props {
    children: ReactNode;
    title?: string;
  };
*/

const origin = typeof window === "undefined" ? '' : window.location.origin 
//const origin = window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Gastón Fleitas" />
                <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Pagina de datos de ${title} `} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbarc/>

            <main style={{
                padding: "0px 20px"
            }}>
                {children}
            </main>
        </>
    )
}
