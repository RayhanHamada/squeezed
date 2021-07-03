import { Container } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Container w="full" h="100vh" bgColor="black">
      <Head>
        <title>Squeezed: Shorten your link with Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Container>
  );
}
