import Head from 'next/head'
import {LeftPanel, RightPanel} from "components";

function Home() {

  return (
    <div className="container-fluid h-100" style={{height: '100%'}}>
      <Head>
        <title>Lariat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row">
          <LeftPanel/>
          <RightPanel/>
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   // const res = await fetch('http://localhost:3000/api/connectors/twint-sqlite')
//   const res = await fetch(`http://localhost:3000/api/retrieve-tweets?limit=${1000}`)
//   const data = await res.json()

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       data,
//     },
//   }
// }


export default Home