# share-my-id
MEAN app for creating collections of authenticated ORCID iDs 

## Developer Setup
### Prerequsites
- [MongoDb Community Server](https://www.mongodb.com/download-center#community)
- [NodeJS 6.9.0 or higher](https://nodejs.org/en/)
- [NPM 3 or higher](https://www.npmjs.com/get-npm)
- [Angular CLI 1.0 or higher](https://github.com/angular/angular-cli)
- [Mailgun Private API Key](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-)
- [Mailgun Public Validation Key](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-)

### 1. Clone project

```git clone git@github.com:ORCID/share-my-id.git```

### 2. Switch to project directory

```cd ~/git/share-my-id```

### 3. Install node dependencies

```npm install```

### 4. Start mongodb and mongo shell

    <path to mongo installation directory>/mongod --dbpath <path to mongo data directory>
    <path to mongo installation directory>/mongo

Paths vary depending on your OS and installation method - see [MongoDB Manual](https://docs.mongodb.com/manual) for more info and alternate startup instructions.

### 6. Create database and user (first time only)

     use smid;
        db.createUser({
          user: "smid_user",
          pwd: "devpassword",
              roles: ["readWrite"]
        });

### 7. Start app

```npm start```

### 8. Open localhost [http://localhost:8080/](http://localhost:8080/)

## Build and reload changes automatically during development

```npm start``` builds Angular source files into the /dist directory once and starts the server; changes will not be rebuilt/reloaded. To rebuild/reload changes automatically:

1. Install [nodemon](https://github.com/remy/nodemon)
```npm install -g nodemon```

2. Start node server with nodemon
```nodemon server.js```

3. In separate tab/window, build the Angular project and watch for changes
```ng build -w```

## Configure ORCID API credentials

This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own sandbox credentials.

#### 1. Register for sandbox credentials at [http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application)

When registering include the redirect_uri 'https://localhost'

#### 2. Override default config by exporting environment variables

Example in bash:

        export CLIENT_ID='APP-3BI8IQ5O8DREEAVF'
        export CLIENT_SECRET='35d8f715-9121-440c-ad34-b66cb8c4e884'
        export ORCID_URL='https://sandbox.orcid.org'
        export PORT_HTTP='8080'
        export HOST='http://localhost:8080'

[other systems](https://www.schrodinger.com/kb/1842)

## Configure Mailgun API credentials and mail domain

Example in bash:

        export MAILGUN_PRIV_API_KEY='************************-********-********-'
        export MAILGUN_PUB_API_KEY='pubkey-************************'
        export MAILGUN_DOMAIN='********.mailgun.org'