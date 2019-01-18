import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router';

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

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      this.trackPageView(url);
    };
  }

  trackPageView(url) {
    try {
      window.gtag('config', 'UA-132762810-1', {
        page_location: url
      });
    } catch (error) {
      console.error('Failed to send google analytics update. Url: ', url);
    }
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