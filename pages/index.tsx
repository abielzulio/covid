import type { NextPage, GetStaticProps } from 'next'
import React from 'react'
import Head from 'next/head'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>COVID-19 Dashboard</title>
        <meta name="description" content="COVID-19 cases dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

/* Function to fetch all countries data in order to serve the country name and it's ISO value later */
export async function getAllCountries() {
  const res = await fetch("https://disease.sh/v3/covid-19/countries")
  return res?.json()
}

/* Pre-render function to run getAllCountries() function on the server side */
export const getStaticProps: GetStaticProps = async (context) => {
  const countries = JSON.parse(JSON.stringify(await getAllCountries()))
  return { props: { countries }}
}

export default Home
