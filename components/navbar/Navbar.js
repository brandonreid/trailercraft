import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import classNames from 'classnames';

import css from './Navbar.scss';

import SubnavTrucks from './subnav/SubnavTrucks';
import SubnavBuses from './subnav/SubnavBuses';
import SubnavVans from './subnav/SubnavVans';
import SubnavPlows from './subnav/SubnavPlows';
import SubnavTrailers from './subnav/SubnavTrailers';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItemOpen: '',
      routeChanged: false,
      isIe: false
    }

    this.setOpenTab = this.setOpenTab.bind(this);
  }

  componentDidUpdate() {
    Router.onRouteChangeStart = url => {
      this.setOpenTab('', true);
    }
  }

  componentDidMount() {
    if (document !== undefined) {
      const isIe = /*@cc_on!@*/false || !!document.documentMode;

      if (isIe) {
        this.setState({isIe: true});
      }
    }
  }

  setOpenTab(tabName, trackChange) {
    let navItemOpen;

    if (tabName === '') {
      navItemOpen = '';
    } else if (this.state.navItemOpen === tabName) {
      navItemOpen = '';
    } else {
      navItemOpen = tabName;
    }

    if (trackChange && this.state.routeChanged === false) {
      this.setState({
        routeChanged: true,
        navItemOpen
      });

      setTimeout(
        function () {
          this.setState({routeChanged: false});
        }
        .bind(this),
        1500
      );
    } else {
      this.setState({
        navItemOpen
      });
    }
  }

  render() {
    const {navItemOpen, routeChanged, isIe} = this.state;
    const {setOpenTab} = this;
    return (
      <div className={classNames(
        css.navbar,
        'clearfix',
        isIe ? css.isIe : ''
      )}>
        <div className={css.subnav}>
          <svg className={css.redAngle}><use xlinkHref="#angle"></use></svg>
          <Link href="/inventory"><a>Current Inventory</a></Link>
          <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
          <a href="tel:1-907-563-3238">(907) 563-3238</a>
          <svg className={classNames(css.chevron, css.hideMobile)}><use xlinkHref="#chevron" /></svg>
          <Link href="/careers">
            <a className={css.hideMobile}>Careers</a>
          </Link>
          <svg className={classNames(css.chevron, css.hideMobile)}><use xlinkHref="#chevron" /></svg>
          <Link href="/gallery">
            <a className={css.hideMobile}>Gallery</a>
          </Link>
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
        <div className={classNames(css.mainNav, {
          [css.routeChanged]: routeChanged
        })}>

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
              [css.showing]: navItemOpen === 'buses',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('buses')}
          >
            <img src="/static/bus.png" alt="Bus" title="Bus" />
            <span>Buses</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'buses'
          })}>
            <div className={css.subnavContainer}>
              <SubnavBuses />
            </div>
            <div
              className={css.subnavBackdrop}
              onClick={() => setOpenTab('buses')}
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
