import Link from 'next/link';

import css from './Footer.scss';

const Footer = () => (
  <footer>
    <div className={css.footer}>
      <div className={css.logoContainer}>
        <Link href="/">
          <a>
            <img src="/static/logo_white_trailercraft.svg" alt="TrailerCraft Logo" />
          </a>
        </Link>
      </div>
      <div className={css.footerContent}>
        <div className={css.navContainer}>
          <h3>Navigation</h3>
          <nav>
            <ul>
              <li><Link href="/inventory"><a>Current Inventory</a></Link></li>
              <li>Trucks
                <ul>
                  <li>Freightliner
                    <ul>
                      <li><Link href="/product-list/freightliner-highway-products"><a>Highway</a></Link></li>
                      <li><Link href="/product-list/freightliner-vocational-products"><a>Vocational</a></Link></li>
                    </ul>
                  </li>
                  <li>Western Star Trucks
                    <ul>
                      <li><Link href="/product-list/western-star-highway-products"><a>Highway</a></Link></li>
                      <li><Link href="/product-list/western-star-vocational-products"><a>Vocational</a></Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><Link href="/product-list/bus-products"><a>Buses</a></Link></li>
              <li><Link href="/product-list/sprinter-van-products"><a>Vans</a></Link></li>
            </ul>
            <ul>
              <li>Plows
                <ul>
                  <li>Western
                    <ul>
                      <li>
                        <Link href="/product-list/western-vehicle-mounted-products">
                          <a>Standard Vehicle Mounted</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/product-list/western-industrial-products">
                          <a>Industrial</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/product-list/snowex-products"><a>Snowex Plows</a></Link>
                  </li>
                </ul>
              </li>
              <li>Trailers
                <ul>
                  <li>
                    <Link href="/product-list/doepker-products"><a>Doepker Trailers</a></Link>
                  </li>
                  <li>
                    <Link href="/product-list/felling-trailers-products"><a>Felling Trailers</a></Link>
                  </li>
                </ul>
              </li>
              {/* <li><Link href="/blog"><a>Blog</a></Link></li> */}
              <li><Link href="/parts-and-services"><a>Parts &amp; Services</a></Link></li>
              <li><Link href="/gallery"><a>Gallery</a></Link></li>
              <li><Link href="/about-us"><a>About Us</a></Link></li>
              <li><Link href="/careers"><a>Careers</a></Link></li>
              <li><Link href="/contact"><a>Contact</a></Link></li>
            </ul>
          </nav>
          <div className={css.socialLinks}>
            <h4>Social Media</h4>
            <a href="https://www.facebook.com/TrailerCraft.FreightlinerofAlaska/" target="_blank">
              <svg className={css.facebook}><use xlinkHref="#facebook"></use></svg>
            </a>
            <a href="https://www.instagram.com/trailercraft_ak/" target="_blank">
              <svg className={css.instagram}><use xlinkHref="#instagram"></use></svg>
            </a>
          </div>
        </div>
        <div className={css.locationsContainer}>
          <div className={css.location}>
            <h3>Anchorage</h3>
            <address>
              222 W 92nd Ave<br />
              Anchorage, AK 99515
            </address>
            <a
              href="https://www.google.com/maps/place/TrailerCraft+Inc/@61.1367921,-149.8868337,17z/data=!3m1!4b1!4m5!3m4!1s0x56c89777f1a8bbff:0x7e518b56156fa94!8m2!3d61.1367895!4d-149.884645"
            >Directions</a>
            <p>
              <strong>Phone:</strong>
              <a href="tel:1-907-563-3238">(907) 563-3238</a>
            </p>
            <p>
              <strong>Toll-free:</strong>
              <a href="tel:1-800-478-3238">1-800-478-3238</a>
            </p>
            <p>
              <strong>After Hours Support</strong>
              <em>24 Hour Call Out</em>
              <a href="tel:1-907-563-3238">(907) 563-3238</a>
            </p>
            <p>
              <strong>Hours:</strong>
              M-F, 7am to Midnight<br />
              Sat, 9am to 5pm
            </p>
          </div>
          <div className={css.location}>
            <h3>Fairbanks</h3>
            <address>
              2143 Van Horn Road<br />
              Fairbanks, AK 99701
            </address>
            <a
              href="https://www.google.com/maps/place/Trailercraft+Inc/@64.812603,-147.7684629,17z/data=!3m1!4b1!4m5!3m4!1s0x51325a94334d968d:0x65c1b39bfbc6d2a4!8m2!3d64.8126007!4d-147.7662741"
            >Directions</a>
            <p>
              <strong>Phone:</strong>
              <a href="tel:1-907-451-0033">(907) 451-0033</a>
            </p>
            <p>
              <strong>Toll-free:</strong>
              <a href="tel:1-800-478-0513">1-800-478-0513</a>
            </p>
            <p>
              <strong>After Hours Support</strong>
              <em>Parts</em>
              <a href="tel:1-907-231-1567">(907) 231-1567</a>
              <em>Service</em>
              <a href="tel:1-907-388-3096">(907) 388-3096</a>
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
