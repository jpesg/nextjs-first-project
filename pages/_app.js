import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  /*NextJs merge Head elementes into one, persists last one */
  return (
    <Layout>
      <Head>
        <title>NextJs Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-with" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;