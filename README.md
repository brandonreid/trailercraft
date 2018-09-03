# Tralercraft Website

### Develop

#### Add required development config files

 - /.env _- secret variables (used on backend)_
```
PORT=<__PORT__>
BUCKET_SLUG=<__BUCKET_SLUG__>
```

#### Run in development
```
npm run dev
```

### Deploy

#### Add required production config files
- /.env.production _- secret variables (used on backend)_
```
PORT=<__PORT__>
BUCKET_SLUG=<__BUCKET_SLUG__>
```
- /.config.js _- public variables (used on frontend)_
```
API_URL: 'https://<__YOUR_DOMAIN__>/api',
BASE_URL: 'https://<__YOUR_DOMAIN__>',
```

- /now.json _- Now deployment configuration_
```
{
  "alias": [
    <__YOUR_DOMAIN__>
  ],
  "dotenv": ".env.production",
  "public": false
}
```

#### Deploy via [Now](https://zeit.co/now)
```
npm run deploy
```
