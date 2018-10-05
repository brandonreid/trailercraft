import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';

const Blogs = ({title, content}) => (
  <div>
    <h1>{title}</h1>
    <div>{renderHTML(content)}</div>
  </div>
);

Blogs.getInitialProps = async ({ query: { slug }}) => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const {object: blog} = await bucket.getObject({
    slug
  });
  return blog;
};

export default Blogs;