/*
 _documents: customize the entire HTML document
 ie: configure the lang attribute,
 add  elements outside app component tree-> add react portals
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
//Head is different from next/head
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <div id="react-portal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
