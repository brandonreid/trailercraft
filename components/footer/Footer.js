import Link from 'next/link';

import css from './Footer.scss';

const Footer = () => (
  <footer>
    <div className={css.footer}>
      <div className={css.logoContainer}>
        <img src="/static/logo_white_trailercraft.svg" alt="TrailerCraft Logo" />
      </div>
      <h1>FINISH THE FOOTER</h1>
    </div>
    <div className={css.copywrite}>
      <p>Copyright © {(new Date()).getFullYear()} TrailerCraft. All Rights Reserved.</p>
      <p>Powered by <a href="http://www.thehighpointagency.com">High Point</a></p>
    </div>
  </footer>
);

export default Footer;
