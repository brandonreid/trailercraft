import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import css from './Navbar.scss';

import SubnavTrucks from './subnav/SubnavTrucks';
import SubnavBusses from './subnav/SubnavBusses';
import SubnavVans from './subnav/SubnavVans';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItemOpen: ''
    }

    this.setOpenTab = this.setOpenTab.bind(this);
  }

  setOpenTab(tabName) {
    if (this.state.navItemOpen === tabName) {
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
          <Link href="/contact?location=anchorage"><a className={css.locationLink}>Anchorage</a></Link>
          <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
          <Link href="/contact?location=fairbanks"><a className={css.locationLink}>Fairbanks</a></Link>
          <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
          <a href="tel:1-907-563-3238">(907) 563-3238</a>
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
        <nav className={css.mainNav}>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'trucks',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('trucks')}
          >
            <img src="/static/truck.png" />
            <span>Trucks</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'trucks'
          })}>
            <div className={css.subnavContainer}>
              <SubnavTrucks />
            </div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'busses',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('busses')}
          >
            <img src="/static/bus.png" />
            <span>Busses</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'busses'
          })}>
            <div className={css.subnavContainer}>
              <SubnavBusses />
            </div>
          </div>

          <button
            className={classNames(`${css.navBtn} symbol`, {
              [css.showing]: navItemOpen === 'vans',
              [css.hoverable]: navItemOpen === ''
            })}
            onClick={() => setOpenTab('vans')}
          >
            <img src="/static/van.png" />
            <span>Vans</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <div className={classNames(css.subnavWrapper, {
            [css.show]: navItemOpen === 'vans'
          })}>
            <div className={css.subnavContainer}>
              <SubnavVans />
            </div>
          </div>

          <button className={`${css.navBtn} symbol`}>
            <img src="/static/plow.png" />
            <span>Plows</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <button className={`${css.navBtn} symbol`}>
            <img src="/static/trailer.png" />
            <span>Trailers</span>
            <svg className={css.dropDownIcon}><use xlinkHref="#dropDown"></use></svg>
          </button>
          <Link href="/parts-and-services">
            <a className={css.partsAndServices}>Parts &amp; Service</a>
          </Link>
        </nav>
      </div>
    );
  }
  
};

export default Navbar;
