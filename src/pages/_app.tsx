import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@/styles/globals.css'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          colors: {
            dark: [
              // tailwindcss background gray-100 tp gray-900
              '#F3F4F6',
              '#E5E7EB',
              '#D1D5DB',
              '#9CA3AF',
              '#6B7280',
              '#4B5563',
              '#374151',
              '#1F2937',
              '#111827',
            ]
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}