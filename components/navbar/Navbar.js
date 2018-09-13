import Link from 'next/link';

import css from './Navbar.scss';

const Navbar = () => (
  <div className={css.navbar}>
    <div className={css.subnav}>
      <Link href="/"><a>Anchorage</a></Link>
      <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
      <Link href="/"><a>Fairbanks</a></Link>
      <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
      <a href="tel:1-907-563-3238">(907) 563-3238</a>
      <Link href="/"><a className={css.contactLink}>Contact</a></Link>
    </div>
    <div className={css.logo}>
      <img src="/static/logo_trailercraft.svg" alt="TrailerCraft Logo" />
    </div>
    <nav className={css.mainNav}>
      <Link><a>Trucks</a></Link>
      <Link><a>Busses</a></Link>
      <Link><a>Vans</a></Link>
      <Link><a>Plows</a></Link>
      <Link><a>Trailers</a></Link>
      <Link><a>Parts & Services</a></Link>
    </nav>
  </div>
);

export default Navbar;
