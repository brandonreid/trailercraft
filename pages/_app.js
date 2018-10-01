import React from 'react'
import App, { Container } from 'next/app'

import '../global-styles/global-styles.scss';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Container>
    )
  }
}