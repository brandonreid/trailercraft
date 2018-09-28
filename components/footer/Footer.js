import Link from 'next/link';

import css from './Footer.scss';

const Footer = () => (
  <footer>
    <div className={css.footer}>
      <div className={css.logoContainer}>
        <img src="/static/logo_white_trailercraft.svg" alt="TrailerCraft Logo" />
      </div>
      <div className={css.footerContent}>
        <div className={css.navContainer}>
          <h2>Navigation</h2>
          <nav>
            <ul>
              <li>Trucks
                <ul>
                  <li>Freightliner
                    <ul>
                      <li><Link href="#0"><a>Highway</a></Link></li>
                      <li><Link href="#0"><a>Vocational</a></Link></li>
                    </ul>
                  </li>
                  <li>Western Star Trucks
                    <ul>
                      <li><Link href="#0"><a>Highway</a></Link></li>
                      <li><Link href="#0"><a>Vocational</a></Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><Link href="#0"><a>Busses</a></Link></li>
              <li>Vans
                <ul>
                  <li><Link href="#0"><a>Sprinter</a></Link></li>
                  <li><Link href="#0"><a>BackCountry</a></Link></li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>Plows
                <ul>
                  <li><Link href="#0"><a>Residential</a></Link></li>
                  <li><Link href="#0"><a>Vocational</a></Link></li>
                  <li><Link href="#0"><a>Commercial</a></Link></li>
                </ul>
              </li>
              <li>Trailers
                <ul>
                  <li><Link href="#0"><a>Equipment Trailers</a></Link></li>
                  <li><Link href="#0"><a>Side Dump Trailers</a></Link></li>
                </ul>
              </li>
              <li><Link href="#0"><a>Parts &amp; Services</a></Link></li>
              <li><Link href="#0"><a>Blog</a></Link></li>
              <li><Link href="#0"><a>Contact</a></Link></li>
            </ul>
          </nav>
        </div>
        <div className={css.locationsContainer}>
          <div className={css.location}>
            <h3>Anchorage</h3>
            <address>
              222 W 92nd Ave<br />
              Anchorage, AK 99515
            </address>
            <a href="#0">Directions</a>
            <p>
              <strong>Phone:</strong>
              <a href="#0">(907) 563-3238</a>
            </p>
            <p>
              <strong>Toll-free:</strong>
              <a href="#0">1-800-478-3238</a>
            </p>
            <p>
              <strong>Hours:</strong>
              M-F, 7am to 12pm<br />
              Sat, 9am to 5pm
            </p>
          </div>
          <div className={css.location}>
            <h3>Fairbanks</h3>
            <address>
              2143 Van Horn Road<br />
              Fairbanks, AK 99701
            </address>
            <a href="#0">Directions</a>
            <p>
              <strong>Phone:</strong>
              <a href="#0">(907) 451-0033</a>
            </p>
            <p>
              <strong>Toll-free:</strong>
              <a href="#0">1-800-478-0513</a>
            </p>
            <p>
              <strong>Hours:</strong>
              M-F, 8am to 5pm
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={css.copywrite}>
      <p>Copyright © {(new Date()).getFullYear()} TrailerCraft. All Rights Reserved.</p>
      <p>Powered by <a href="http://www.thehighpointagency.com">High Point</a></p>
    </div>
  </footer>
);

export default Footer;
