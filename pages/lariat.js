import { useEffect } from "react";
import Head from 'next/head'
import styles from 'styles/Home.module.css'
import LeftPanel from "components/left-panel";

function Home({data}) {

  useEffect( () => {
    console.log("Home:data", data);
  },[])

  return (
    <div className="container-fluid">
      <Head>
        <title>Lariat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="row">
          <LeftPanel/>
          <div className="col-md-6 h-100">
            One of three columns
          </div>
          <div className="col h-100">
            One of three columns
          </div>
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