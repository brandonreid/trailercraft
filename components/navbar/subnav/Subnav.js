import Link from 'next/link';
import renderHTML from 'react-render-html';

import css from './Subnav.scss';

// Provide data like so...
// columns = [
//   {
//     logoUrl: '/static/logo_freightliner.svg',
//     logoAlt: 'Freightliner Logo',
//     pageRoute: '/trucks',
//     contentItems: [
//       {
//         itemTitle: 'Highway',
//         mobileTitle: 'Freightliner Highway',
//         moreLink: '/freightliner-highway',
//         products: [
//           ...bucketObjects
//         ]
//       }
//     ]
//   }
// ];

const Subnav = ({columns}) => (
  <div className={css.componentContainer}>
    {columns.map(({logoUrl, logoAlt, pageRoute, contentItems, contentText}, i) => (
      <div className={css.column} key={i}>
        <div className={css.mobileMenu}>
          {contentItems && contentItems.map(({moreLink, mobileTitle}, i) => (
            <div className={css.mobileLink} key={i}>
              <Link href={moreLink}>
                <a>
                  <span>{ mobileTitle }</span>
                  <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
                </a>
              </Link>
            </div>
          ))}
          {contentText && (
            <div className={css.contentText}>
              { renderHTML(contentText) }
            </div>
          )}
        </div>
        <div className={css.logoContainer}>
          <div className={css.logo}>
            <img src={logoUrl} alt={logoAlt}/>
          </div>
        </div>
        <div className={css.colContent}>
          {contentItems && contentItems.map(({itemTitle, moreLink, products}, i) => (
            <div className={css.subContentItem} key={i}>
              <div className={css.sciHeader}>
                <p>{ itemTitle }</p>
                <Link href={moreLink}><a>More</a></Link>
              </div>
              <div className={css.sciItems}>
                {products.map(({slug, title, metadata}, i) => (
                  <Link
                    href={`${pageRoute ? pageRoute : '/product'}/${slug}`}
                    key={i}
                  >
                    <a
                      className={css.sciItem}
                      style={{
                        backgroundImage: `url(${metadata.product_image.imgix_url.replace(/ /g, "%20")}?w=300)`
                      }}
                    >
                      <span>{ title }</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {contentText && (
            <div className={css.contentText}>
              { renderHTML(contentText) }
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default Subnav;
