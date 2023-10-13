import Head from 'next/head';
import Header from '../Header';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} · Liteauth` : 'Liteauth'}
        </title>
        <meta name="description" content="Simple auth frontend with jwt" />
      </Head>
      <div className="min-h-screen bg-gray-100 px-32 pb-20">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
