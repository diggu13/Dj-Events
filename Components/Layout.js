import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import { useRouter } from 'next/router'
const Layout = ({title,Keywords,description,children}) => {
  const router = useRouter();
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={Keywords} />
        </Head>
        <Header/>
        {router.pathname === '/' && <Showcase/>}
        {children}
        <Footer/>
    </div>
  )
}
Layout.defaultProps = {
    title : 'Dj Events || Find the hottest bash',
    description:'Find the latest parties'
}

export default Layout