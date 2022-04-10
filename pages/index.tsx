import type { NextPage, GetStaticProps } from 'next'
import React from 'react'
import Head from 'next/head'
import { Container, Heading } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Country } from "../types"

const Home: NextPage<{ countries: Country[] }> = ({ countries }) => {

  return (
    <div>
      <Head>
        <title>COVID-19 Dashboard</title>
        <meta name="description" content="COVID-19 cases dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="container.xl" padding={12}>
        <Heading as="h1" mb="4">Worldwide COVID-19 cases tracker</Heading>
        <Select>
            <option value="worldwide">Worldwide</option>
            {countries.map((ctr: Country, id: number) => {
              return (
                  <option 
                    key={id} 
                    value={ctr.countryInfo.iso2}
                  >{ctr.country}</option>
              )
            })}
          </Select>
      </Container>
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
