import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8"/>

          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,900" rel="stylesheet" />

          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        <body>
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               style={{display: 'none'}}>
            <defs>
              <symbol id="chevron" viewBox="0 0 29.5 20">
                <path d="M9.1,0.3C8.8,0.1,8.4,0,8.2,0H8.2h0l0,0H1.1l0,0l0,0H0.7C0.3,0-0.4,0.2,0.3,0.8l9,9.1l-8.8,9.3h0C-0.2,19.9,0.5,20,1,20h0.3
                  c0,0,0,0,0,0h0h7c0.2,0,0.6-0.1,1-0.4l9.5-9.7L9.1,0.3z M29.5,9.9l-9.6-9.6C19.6,0,19.2,0,19.1,0H19h0l0,0h-7.5
                  c-0.4,0-1.1,0.2-0.4,0.8l9,9.1l-8.8,9.3l0,0c-0.6,0.6,0,0.8,0.5,0.8h0.3c0,0,0,0,0,0h0h6.9l0,0c0,0,0.6,0,1-0.4l0,0L29.5,9.9z"/>
              </symbol>
              <symbol id="angle" viewBox="0 0 16 13">
                <polygon className="st0" points="13,13 0,0 16,0 16,13 "/>
              </symbol>
              <symbol id="dropDown" viewBox="0 0 29 14">
                <polygon className="st0" points="0,0 5,0 14,9 23,0 29,0 14,14 "/>
              </symbol>
              <symbol id="close" viewBox="0 0 17 17">
                <path d="M9.91,8.5l6.79-6.79c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L8.5,7.09L1.71,0.29c-0.39-0.39-1.02-0.39-1.41,0
                  s-0.39,1.02,0,1.41L7.09,8.5l-6.79,6.79C0.1,15.49,0,15.74,0,16s0.1,0.51,0.29,0.71c0.39,0.39,1.02,0.39,1.41,0L8.5,9.91l6.79,6.79
                  C15.49,16.9,15.74,17,16,17s0.51-0.1,0.71-0.29c0.39-0.39,0.39-1.02,0-1.41L9.91,8.5z"/>
              </symbol>
            </defs>
          </svg>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}