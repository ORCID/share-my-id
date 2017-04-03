# share-my-id
MEAN app for creating collections of authenticated ORCID iDs 

## Developer Setup
### Prerequsites
- [MongoDb Community Server](https://www.mongodb.com/download-center#community)
- [NodeJS 6.9.0 or higher](https://nodejs.org/en/)
- [NPM 3 or higher](https://www.npmjs.com/get-npm)
- [Angular CLI 1.0 or higher](https://github.com/angular/angular-cli)

###1. Clone project
```git clone git@github.com:ORCID/share-my-id.git```

###2. Switch to project directory
```cd ~/git/share-my-id```

###3. Install node dependencies
```npm install```

###4. Start mongodb and mongo shell
    <path to mongo installation directory>/mongod --dbpath <path to mongo data directory>
    <path to mongo installation directory>/mongo

Paths vary depending on your OS and installation method - see [MongoDB Manual](https://docs.mongodb.com/manual) for more info and alternate startup instructions.

###5. Create database and user (first time only)
     use smid;
        db.createUser({
          user: "smid_user",
          pwd: "devpassword",
              roles: ["readWrite"]
        });

###4. Start app
```npm start```

###5. Open localhost [https://localhost:8443/](https://localhost:8443/)

##Build/reload changes automatically
```npm start``` builds Angular source files into the /dist directory once and starts the server; changes will not be rebuilt/reloaded. To rebuild/reload changes automatically:

1. Install [nodemon](https://github.com/remy/nodemon)
```npm install nodemon```

2. Start node server with nodemon
```nodemon server.js```

3. In separate tab/window, build the Angular project and watch for changes
```ng build -w```

##Configure ORCID API credentials
This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own sandbox credentials.

####1. Register for sandbox credentials at [http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application)
When registering include the redirect_uri 'https://localhost'

####2. Add API credentials to config file
Open ```helper/config.js``` in a text, edit the environment variables below, and save the file.

* CLIENT_ID - Client id issued by ORCID.
* CLIENT_SECRET - Client secret issued by ORCID

##Troubleshooting Tips:

* You get a 400 error `DNS name does not have enough labels`. Means the local `~/letsencrypt/*` directory is corrupt from switching node apps. Clear the letsencrypt directory to reset `rm -rf ~/letsencrypt/*` 