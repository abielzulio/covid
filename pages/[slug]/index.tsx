import type { NextPage } from 'next'
import Head from 'next/head'
export const CountryPage: NextPage<{ ctr: Country }> = ({ ctr }) => {
    return (
        <div>
            <Head>
                <title>{ctr?.country}&apos; COVID case</title>
                <meta name="description" content="COVID-19 cases dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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