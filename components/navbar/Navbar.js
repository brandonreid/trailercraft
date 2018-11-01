import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import classNames from 'classnames';

import css from './Navbar.scss';

import SubnavTrucks from './subnav/SubnavTrucks';
import SubnavBusses from './subnav/SubnavBusses';
import SubnavVans from './subnav/SubnavVans';
import SubnavPlows from './subnav/SubnavPlows';
import SubnavTrailers from './subnav/SubnavTrailers';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItemOpen: ''
    }

    this.setOpenTab = this.setOpenTab.bind(this);
  }

  componentDidUpdate() {
    Router.onRouteChangeStart = url => {
      this.setOpenTab('');
    }
  }

  setOpenTab(tabName) {
    if (tabName === '') {
      this.setState({
        navItemOpen: ''
      });
    } else if (this.state.navItemOpen === tabName) {
      this.setState({
        navItemOpen: ''
      });
    } else {
      this.setState({
        navItemOpen: tabName
      });
    }
  }

  render() {
    const {navItemOpen} = this.state;
    const {setOpenTab} = this;
    return (
      <div className={`${css.navbar} clearfix`}>
        <div className={css.subnav}>
          <svg className={css.redAngle}><use xlinkHref="#angle"></use></svg>
          <Link href="/contact?location=anchorage">
            <a className={classNames(css.locationLink, css.hideMobile)}>Anchorage</a>
          </Link>
          <svg className={classNames(css.chevron, css.hideMobile)}><use xlinkHref="#chevron" /></svg>
          <Link href="/contact?location=fairbanks">
            <a className={classNames(css.locationLink, css.hideMobile)}>Fairbanks</a>
          </Link>
          <svg className={classNames(css.chevron, css.hideMobile)}><use xlinkHref="#chevron" /></svg>
          <a href="tel:1-907-563-3238">(907) 563-3238</a>
          <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
          <Link href="/inventory"><a><strong>Current Inventory</strong></a></Link>
          <Link href="/contact">
            <a className={css.contactLink}>
              <svg className={css.blackAngle}><use xlinkHref="#angle"></use></svg>
              <span>Contact</span>
            </a>
          </Link>
        </div>
        <div className={css.logo}>
          <Link href="/">
            <a title="Home">
              <img src="/static/logo_trailercraft.svg" alt="TrailerCraft Logo" />
            </a>
          </Link>
        </div>
        <div className={css.mainNav}>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'trucks',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('trucks')}
          >
            <img src="/static/truck.png" alt="Truck" title="Truck" />
            <span>Trucks</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'trucks'
          })}>
            <div className={css.subnavContainer}>
              <SubnavTrucks />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('trucks')}
            ></div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'busses',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('busses')}
          >
            <img src="/static/bus.png" alt="Bus" title="Bus" />
            <span>Busses</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'busses'
          })}>
            <div className={css.subnavContainer}>
              <SubnavBusses />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('busses')}
            ></div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'vans',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('vans')}
          >
            <img src="/static/van.png" alt="Van" title="Van" />
            <span>Vans</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'vans'
          })}>
            <div className={css.subnavContainer}>
              <SubnavVans />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('vans')}
            ></div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'plows',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('plows')}
          >
            <img src="/static/plow.png" alt="Plow" title="Plow" />
            <span>Plows</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'plows'
          })}>
            <div className={css.subnavContainer}>
              <SubnavPlows />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('plows')}
            ></div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'trailers',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('trailers')}
          >
            <img src="/static/trailer.png" alt="Trailer" title="Trailer" />
            <span>Trailers</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'trailers'
          })}>
            <div className={css.subnavContainer}>
              <SubnavTrailers />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('trailers')}
            ></div>
          </div>

          <Link href="/parts-and-services">
            <a className={css.partsAndServices}>Parts &amp; Service</a>
          </Link>
        </div>
      </div>
    );
  }
  
};

export default Navbar;
