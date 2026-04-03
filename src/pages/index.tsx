import Head from "next/head";
import FileLayout from "./components/fileLayout";
import MobileFileLayout from "./components/mobileFileLayout";
import Footer from "./components/footer";
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather(
  {
    weight: '400',
    subsets: ['latin']
  }
)

export default function Home() {
  return (
    <main className={`${merriweather.className} h-screen flex flex-col max-w-full overflow-hidden bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>
      <Head>
        <title>File Comparer</title>
      </Head>
      <h1 className="text-xl md:text-5xl font-bold py-2 md:py-4 text-center shrink-0">File Comparer</h1>
      {/* Desktop layout */}
      <div className="hidden md:flex px-10 flex-1 flex-col min-h-0">
        <FileLayout />
      </div>
      {/* Mobile layout */}
      <div className="flex md:hidden flex-1 flex-col min-h-0">
        <MobileFileLayout />
      </div>
      <div className="px-4 md:px-10 shrink-0">
        <Footer />
      </div>
    </main>
  )
}
