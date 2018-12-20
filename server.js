const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/blogs/:id', (req, res) => {
      const page = '/blogs';
      const queryParams = { slug: req.params.id };
      app.render(req, res, page, queryParams);
    });

    server.get('/product/:id', (req, res) => {
      const page = '/product';
      const queryParams = { slug: req.params.id };
      app.render(req, res, page, queryParams);
    });

    server.get('/product-list/:id', (req, res) => {
      const page = '/product-list';
      const queryParams = { slug: req.params.id };
      app.render(req, res, page, queryParams);
    });

    server.get('/careers/:id', (req, res) => {
      const page = '/career';
      const queryParams = { slug: req.params.id };
      app.render(req, res, page, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000')
    });
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1);
  });
