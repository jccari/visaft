import { useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home({data}) {

  useEffect( () => {
    console.log("Home:data", data);
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Lariat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // const res = await fetch('http://localhost:3000/api/connectors/twint-sqlite')
  const res = await fetch(`http://localhost:3000/api/retrieve-tweets?limit=${1000}`)
  const data = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  }
}


export default Home