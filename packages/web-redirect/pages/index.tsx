import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Squeezed</title>
        <meta name="description" content="Shorten your URL with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-screen bg-black justify-center items-stretch text-white">
        <p className="text-center">Redirect you to app.sqzd.xyz...</p>
        <div className="mx-auto mt-4">
          <svg
            className="animate-spin h-5 w-5 mr-3 bg-white"
            viewBox="0 0 24 24"
          ></svg>
        </div>
      </div>
    </div>
  );
}
