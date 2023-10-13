import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          Liteauth
        </title>
        <meta name="description" content="Simple auth frontend with jwt" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
