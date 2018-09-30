import classNames from 'classnames';

import css from './BigContactCard.scss';

import Textarea from '../textarea-filter';

const BigContactCard = ({ data, locationName }) => (
  <div>
    <div className={css.contactCard}>
      <div>
        <h2>TrailerCraft, Inc. { locationName }</h2>
        <address>
          <Textarea text={data.address} />
        </address>
        <div
          className={css.phoneNumbers}
          dangerouslySetInnerHTML={{__html: data.main_phone_numbers}}
        ></div>
        <p className={css.hoursTitle}><strong>Hours</strong></p>
        <div
          className={css.hours}
          dangerouslySetInnerHTML={{__html: data.business_hours}}
        ></div>
      </div>
      <div>
        <a className={css.directionsLink}
            target="_blank"
            href={data.google_maps_url}>
          <img src={`${data.map_image.imgix_url}?w=600`}
                alt={`Map to ${locationName} Location`}/>
          <span>Directions</span>
        </a>
      </div>
    </div>
    { data.department_contacts_left_column || data.department_contacts_left_column ? (
      <div className={classNames(css.additionalContacts, {
        [css.twoColumn]: data.department_contacts_left_column
                        && data.department_contacts_left_column
        })}
      >
        <h2>{locationName} Departments</h2>
        {data.department_contacts_left_column && (
          <div className="additional-contacts-content"
                dangerouslySetInnerHTML={{__html: data.department_contacts_left_column}}></div>
        )}
        {data.department_contacts_right_column && (
          <div className="additional-contacts-content"
                dangerouslySetInnerHTML={{__html: data.department_contacts_right_column}}></div>
        )}
      </div>
    ) : ''}
  </div>
);

export default BigContactCard;
