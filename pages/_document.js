import Document, { Head, Main, NextScript } from 'next/document'
import css from '../global-styles/global-styles.scss';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900" rel="stylesheet" />
          <title>TrailerCraft, Inc</title>
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
                <polygon class="st0" points="13,13 0,0 16,0 16,13 "/>
              </symbol>
              <symbol id="dropDown" viewBox="0 0 29 14">
                <polygon class="st0" points="0,0 5,0 14,9 23,0 29,0 14,14 "/>
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