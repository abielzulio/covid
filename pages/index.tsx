import type { NextPage, GetStaticProps } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { Container, Heading, Box, Flex, Spacer, Text, Link, Select } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Country } from "../types"
import { useColorModeValue } from '@chakra-ui/react'
import NextLink from "next/link"

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

  /* Function to handle country change based on user selection */
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

        <Flex align="center" justify="center" mb={12} mt={4}>
          <Heading as={'h1'} fontWeight={'extrabold'}>Worldwide COVID-19 Cases Tracker</Heading>
        </Flex>

        <Flex my={4}>
          <Box>
            <Heading as={'h3'} size={'md'}>Today Cases</Heading>
            <Text my={1.5}>{countryInfo?.country ?? "Worldwide"}</Text>
          </Box>
          <Spacer />
          <Box>
            <Select onChange={onCountryChange}>
              <option value="worldwide">Worldwide</option>
              {sortDataByTodayActiveCases(countries).map((ctr: Country, id: number) => {
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
          <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: 3 }}>
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
                  <Text fontSize={'xs'} fontWeight={'bold'} mb={1}>ACTIVE</Text>
                  <Text fontSize={'3xl'} color={'yellow.400'} mb={2}>+{countryInfo?.todayCases?.toLocaleString() ?? "-"}</Text>
                  <Flex align={'center'} gap={2}>
                    <Box bg={'yellow.100'} py={1} px={2} rounded={'md'} w={'auto'}>
                      <Text fontSize={'xs'} fontWeight={'semibold'} color={'yellow.600'}>{countryInfo?.active?.toLocaleString() ?? "-"}</Text>
                    </Box>
                  </Flex>
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
                  <Flex align={'center'} gap={2}>
                    <Box bg={'red.50'} py={1} px={2} rounded={'md'} w={'auto'}>
                      <Text fontSize={'xs'} fontWeight={'semibold'} color={'red.600'}>{countryInfo?.deaths?.toLocaleString() ?? "-"}</Text>
                    </Box>
                  </Flex>
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
                <Text fontSize={"xs"} fontWeight={"bold"}>RECOVERED</Text>
                <Text fontSize={"3xl"} color={"green.400"} my={1}>+{countryInfo?.todayRecovered?.toLocaleString() ?? "-"}</Text>
                <Flex align={'center'} gap={2}>
                    <Box bg={'green.50'} py={1} px={2} rounded={'md'} w={'auto'}>
                      <Text fontSize={'xs'} fontWeight={'semibold'} color={'green.600'}>{countryInfo?.recovered?.toLocaleString() ?? "-"}</Text>
                    </Box>
                </Flex>
              </Box>
              <Box/>
            </Box>
          </Flex>
        </Box>

        <Box mt={12}>
            <Heading as={'h3'} size={'md'}>Total Cases</Heading>
            <Text my={1.5}>All Countries</Text>
        </Box>

        <Box
          my={6}              
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'xl'}
          rounded={'md'}
          h={"375px"}
          overflowY={"scroll"}
          px={2}
          pt={4}>
          <TableContainer>
            <Table variant='simple' size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Country</Th>
                  <Th>Cases</Th>
                  <Th>Active</Th>
                  <Th>Death</Th>
                  <Th>Recovered</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortDataByTodayActiveCases(countries).map((ctr: Country, id: number) => {
                  return (
                    <Tr key={id}>
                      <Td>
                        <NextLink href={{
                            pathname: '/[slug]',
                            query: { slug: ctr?.countryInfo?.iso2?.toLocaleLowerCase() }
                            }} passHref>
                          <Link>
                            <Td>{ctr?.country}</Td>
                          </Link>
                        </NextLink>
                      </Td>
                      <Td>{ctr?.cases?.toLocaleString()}</Td>
                      <Td>{ctr?.active?.toLocaleString()}</Td>
                      <Td>{ctr?.deaths?.toLocaleString()}</Td>
                      <Td>{ctr?.recovered?.toLocaleString()}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex align={'center'} my={10}>
          <Text color={"gray.500"}>Last updated on {new Date(countries[0].updated).toLocaleString()}</Text>
          <Spacer />
          <Flex gap={1}>
            <Text>Made by <NextLink href="https://zulio.me" passHref><Link>Lio</Link></NextLink>,</Text>
            <Text fontSize={'s'}>{new Date().getUTCFullYear()}.</Text>
          </Flex>
        </Flex>
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

/* Function to sort country data by the most today's active cases number */
export const sortDataByTodayActiveCases = (data: Country[]) => {
  let sortedData = [...data]
  sortedData.sort((a, b) => {
    if (a.todayCases > b.todayCases) { return -1 } else { return 1 }
  })
  return sortedData
};

export default Home
