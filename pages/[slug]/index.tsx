import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from "next/link"
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Country, Context } from "../../types"
import { Link, Container, Flex, Box, Text, Heading, Spacer } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

export const CountryPage: NextPage<{ ctr: Country }> = ({ ctr }) => {
    return (
        <div>
            <Head>
                <title>{ctr?.country}&apos; COVID case</title>
                <meta name="description" content="COVID-19 cases dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container maxWidth="container.xl" px={6} py={24}>

                <Flex mb={6}>
                    <NextLink href={{ pathname: '/' }} scroll={false} passHref>
                        <Link>
                            <Flex w={'auto'} align={'center'} gap={2}>
                                <ArrowBackIcon w={4} h={4} color={'blue.500'}/>
                                <Text fontSize={'s'} color={'blue.500'}>
                                    Back to Home
                                </Text>
                            </Flex>
                        </Link>
                    </NextLink>
                </Flex>

                <Flex mb={8}>
                    <Flex flexDirection={'column'} gap={3}>
                        <Heading as={'h1'} size={'xl'}>{ctr?.country}</Heading>
                        <Flex gap={3}>
                            <Box bg={'gray.100'} py={1} px={2} rounded={'md'} w={'auto'}>
                                <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.600'}>{ctr?.continent?.toLocaleUpperCase() ?? "-"}</Text>
                            </Box>
                            <Box bg={'gray.100'} py={1} px={2} rounded={'md'} w={'auto'}>
                                <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.600'}>{ctr?.countryInfo?.iso2 ?? "-"}</Text>
                            </Box>
                            <Box bg={'gray.100'} py={1} px={2} rounded={'md'} w={'auto'}>
                                <Text fontSize={'xs'} fontWeight={'medium'} color={'gray.600'}>{ctr?.countryInfo?.iso3 ?? "-"}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Spacer />
                    <Image 
                        alt={`${ctr?.country}'s flag`} 
                        src={`${ctr?.countryInfo?.flag}`}
                        width={120}
                        height={4}
                    />
                </Flex>

                <Box mt={12}>
                    <Heading as={'h3'} size={'md'}>Today Cases</Heading>
                </Box>

                <Box my={4}>
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
                                    <Text fontSize={'3xl'} color={'yellow.400'} mt={1}>+{ctr?.todayCases?.toLocaleString() ?? "-"}</Text>
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
                                        <Text fontSize={"3xl"} color={"red.400"} mt={1}>+{ctr?.todayDeaths?.toLocaleString() ?? "-"}</Text>
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
                                    <Text fontSize={"3xl"} color={"green.400"} mt={1}>+{ctr?.todayRecovered?.toLocaleString() ?? "-"}</Text>
                                </Box>
                            <Box/>
                        </Box>
                    </Flex>
                </Box>

                <Box mt={12}>
                    <Heading as={'h3'} size={'md'}>Total Cases</Heading>
                </Box>

                <Box my={4}>
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
                                    <Text fontSize={'3xl'} color={'yellow.400'} mt={1}>{ctr?.cases?.toLocaleString() ?? "-"}</Text>
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
                                        <Text fontSize={"3xl"} color={"red.400"} mt={1}>{ctr?.deaths?.toLocaleString() ?? "-"}</Text>
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
                                    <Text fontSize={"3xl"} color={"green.400"} mt={1}>{ctr?.recovered?.toLocaleString() ?? "-"}</Text>
                                </Box>
                            <Box/>
                        </Box>
                    </Flex>
                </Box>
                <Text mt={12} color={"gray.500"}>Last updated on {new Date(ctr?.updated).toLocaleString()}</Text>
            </Container>
        </div>
    )
}

/* Function to fetch country data based on it's ISO2 country code */
export async function getCountryData(countryCode: string) {
    const res = await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
    return res?.json()
}

/* Server-side function to run getCountryData() with a parameter from the page slug (/[slug]) taken from Vercel's pageContext */
export const getServerSideProps = async (ctx: Context) => {
    const country = JSON.parse(JSON.stringify(await getCountryData(ctx.query.slug)))
    return { props: { ctr: country }}
}

export default CountryPage