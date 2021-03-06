# React/NextJS with CosmicJS Starter
A simple starter for building SEO friendly react apps that leverage [CosmicJS](https://cosmicjs.com) as the backend and CMS.

Sass is used for styles.
Api requests are made using the [CosmicJS NPM package](https://www.npmjs.com/package/cosmicjs).

## Getting Started
- Clone and `npm install`. (npm v6* def works)
- Add a `.env` file to the root of your project with your CosmicJS environment variables.
- `npm run dev`

### Environment Variables (really only need cosmic_bucket).
Get these by logging into [CosmicJS.com](https://cosmicjs.com/), Settings/Basic Settings of the trailercraft bucket.
The `COSMIC_BUCKET` is `trailercraft`, then generate a new read key.
```
COSMIC_BUCKET=XXXX
COSMIC_WRITE_KEY=XXXX
COSMIC_READ_KEY=XXXX
```

## Deploying to now

To deploy to now just add keys via your console before running `now`:
```sh
$ now secret add COSMIC_BUCKET XXXX
$ now secret add COSMIC_WRITE_KEY XXXX
$ now secret add COSMIC_READ_KEY XXXX
```
