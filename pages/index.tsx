import type { NextPage, GetStaticProps } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { Container, Heading, Box, Flex, Center, Spacer, Text, Link } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Country } from "../types"
import { useColorModeValue } from '@chakra-ui/react'

const Home: NextPage<{ countries: Country[] }> = ({ countries }) => {

  const defaultValueCountryInfo = {}
  const [countryInfo, setCountryInfo] = useState<Country>(defaultValueCountryInfo as Country)
  const [country, setInputCountry] = useState<string>("worldwide")

  /* Initial state when first load showing worldwide cases */
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])


  const onCountryChange: React.ChangeEventHandler = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const countryCode = e.target.value
    const url = 
      (countryCode === "worldwide") 
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInputCountry(countryCode)
        setCountryInfo(data)
      })
  }
  return (
    <div>
      <Head>
        <title>COVID-19 Dashboard</title>
        <meta name="description" content="COVID-19 cases dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="container.xl" p={6}>

        <Center>
          <Heading as={'h1'} my={4}>Worldwide COVID-19 Cases Tracker</Heading>
        </Center>

        <Flex my={4}>
          <Box>
            <Heading as={'h3'} size={'md'}>Today Cases</Heading>
            <Text my={1.5}>{countryInfo?.country ?? "Worldwide"}</Text>
          </Box>
          <Spacer />
          <Box>
            <Select onChange={onCountryChange}>
              <option value="worldwide">Worldwide</option>
              {countries.map((ctr: Country, id: number) => {
                return (
                    <option 
                      key={id} 
                      value={ctr.countryInfo?.iso2}
                    >{ctr.country}</option>
                )
              })}
            </Select>
          </Box>
        </Flex>

        <Box my={6}>
          <Flex >
            <Box
              maxW={'full'}
              minW={'100px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'xl'}
              rounded={'md'}
              overflow={'hidden'}>
                <Box w={'full'} bg={'yellow.400'} h={2} />
                <Box p={4}>
                  <Text fontSize={'xs'} fontWeight={'bold'}>ACTIVE</Text>
                  <Text fontSize={'3xl'} color={'yellow.400'} my={1}>+{countryInfo?.todayCases?.toLocaleString() ?? "-"}</Text>
                  <Text fontSize={'xs'} fontWeight={'normal'}>{countryInfo?.active?.toLocaleString() ?? "-"}</Text>
                </Box>
            </Box>
            <Spacer mx={"2"} />
            <Box
              maxW={'full'}
              minW={'100px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'xl'}
              rounded={'md'}
              overflow={'hidden'}>
                <Box w={'full'} bg={'red.400'} h={2} />
                <Box p={4}>
                  <Text fontSize={"xs"} fontWeight={"bold"}>DEATH</Text>
                  <Text fontSize={"3xl"} color={"red.400"} my={1}>+{countryInfo?.todayDeaths?.toLocaleString() ?? "-"}</Text>
                  <Text fontSize={"xs"} fontWeight={"normal"}>{countryInfo?.deaths?.toLocaleString() ?? "-"}</Text>
                </Box>
            </Box>
            <Spacer mx={"2"} />
            <Box
              maxW={'full'}
              minW={'100px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Box w={'full'} bg={'green.400'} h={2} />
              <Box p={4}>
                <Text fontSize={"xs"} fontWeight={"bold"} opacity={10}>RECOVERED</Text>
                <Text fontSize={"3xl"} color={"green.400"} my={1}>+{countryInfo?.todayRecovered?.toLocaleString() ?? "-"}</Text>
                <Text fontSize={"xs"} fontWeight={"normal"}>{countryInfo?.recovered?.toLocaleString() ?? "-"}</Text>
              </Box>
              <Box/>
            </Box>
          </Flex>
        </Box>

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
export const getStaticProps: GetStaticProps = async () => {
  const countries: Country[] = JSON.parse(JSON.stringify(await getAllCountries()))
  return { props: { countries }}
}

export default Home
