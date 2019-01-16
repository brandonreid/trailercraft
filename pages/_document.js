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

          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

          <script src="/static/polyfills.js"></script>
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
              <symbol id="facebook" viewBox="0 0 448 512">
                <path d="M448 56.7v398.5c0
                  13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9
                  33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1
                  480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"/>
              </symbol>
              <symbol id="instagram" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7
                  141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0
                  14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1
                  27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4
                  58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7
                  67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5
                  11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6
                  22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7
                  102.7-9 132.1z" />
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