import Head from "next/head";
import FileLayout from "./components/fileLayout";
import Footer from "./components/footer";
import { Merriweather } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const merriweather = Merriweather(
  {
    weight: '400',
    subsets: ['latin']
  }
)

export default function Home() {
  return (
    <main className={`${merriweather.className} bg-gray-700 text-gray-300`}>
      <Head>
        <title>File Comparer</title>
      </Head>
      <h1 className="text-3xl md:text-5xl font-bold py-12 text-center">File Comparer</h1>
      <div className="px-10">
        <FileLayout />
        <Footer />
      </div>
    </main>
  )
}
