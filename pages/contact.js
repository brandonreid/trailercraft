import React from 'react';
import Cosmic from 'cosmicjs';
import classNames from 'classnames';
import Head from 'next/head';

import css from './contact.scss';

import BigContactCard from '../components/big-contact-card/BigContactCard';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'anchorage'
    }

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(location) {
    this.setState({activeTab: location});
  }

  componentDidMount() {
    if (window && window.location) {
      // check route param and assign the location if there is one.
      const vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      if (vars && vars.location !== undefined) {
        this.setState({
          activeTab: vars.location
        });
      }
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const request = await bucket.getObject({
      slug: 'contact'
    });
    const data = request.object.metadata;
  
    return {data};
  }

  render() {
    const { setActiveTab } = this;
    const { data } = this.props;
    const { activeTab } = this.state;
    return (
      <div className={css.contactContainer}>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Contact Us"
          />
          <title>TrailerCraft, Inc – Contact Us</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="Contact Trailercraft, Inc. for trucks, buses, vans, plows, trailers and parts or service."
          />
        </Head>
        <div className={css.containedContact}>
          <h1>Contact</h1>
          <div className={css.tabs}>
            <button
              className={classNames(
                { [css.active]: activeTab === 'anchorage' }
              )}
              onClick={() => setActiveTab('anchorage')}
            >Anchorage</button>
            <button
              className={classNames(
                { [css.active]: activeTab === 'fairbanks' }
              )}
              onClick={() => setActiveTab('fairbanks')}
            >Fairbanks</button>
          </div>
          <div className={classNames(
            css.tabContent,
            { [css.active]: activeTab === 'anchorage' }
          )}>
            <BigContactCard data={data.anchorage} locationName='Anchorage' />
          </div>

          <div className={classNames(
            css.tabContent,
            { [css.active]: activeTab === 'fairbanks' }
          )}>
            <BigContactCard data={data.fairbanks} locationName='Fairbanks' />
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;
