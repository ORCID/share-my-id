# orcid-id-to-gdoc
Simple node.js app that collects authenticated ORCID iDs and uploads them to a Google document.

## Quickstart Installation

###1. Configure Google API service account credentials
Follow instructions at : https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method

###2. Create a new Google spreadsheet and share it with your service account
Make note of the file 'key' - the unique string of letters and numberse included in the file URL:
https://docs.google.com/spreadsheets/d/**1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc**/edit

###3. Install NodeJS or Upgrade 

[Install it!](https://nodejs.org/)
or 
[Upgrade it!](http://davidwalsh.name/upgrade-nodejs)

###4. Download Project

Download [zip file](https://github.com/ORCID/orcid-id-to-gdoc-master/archive/master.zip) and
 unzip.
   
###5. Open a command prompt

* **Windows**
 
    Select `Search programs and files` type in `node.js command prompt` and select `Node.js command prompt`.
    
* **OSX**
 
    Open terminal by clicking `Search Spotlight` typing in `Terminal` and selecting Terminal.


###6. Point the command prompt to the ```orcid-id-to-gdoc-master``` directory that you just downloaded

* **Windows**

        cd Downloads/orcid-id-to-gdoc-master

* **OSX**

        cd Downloads/orcid-id-to-gdoc-master

###7. Install client app node dependencies
Type the following command into the command prompt and hit return.

       npm install 

###8. (OPTIONAL) Configure ORCID API credentials. 

This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own  
sandbox credentials or other [environment variables](http://en.wikipedia.org/wiki/Environment_variable). Note that the DOI Dudes authorization is launched from the redirect URI, if you are testing with your own credentials, we suggest adding https://localhost as a redirect URI to the credentials and using the default URI. You can register for sandbox credentials at:
[http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application). 

The following configuration keys can be set when starting the client application:

* CLIENT_ID - Client id issued by ORCID.
* CLIENT_SECRET - Client secret issued by ORCID
* REDIRECT_URI - Link user is sent back to with OAuth2 authorization code.
* AUTHORIZE_URI - https://sandbox.orcid.org or https://orcid.org
* TOKEN_EXCHANGE_URI - https://sandbox.orcid.org/oauth/token or https://orcid.org/oauth/token
* GOOGLE_DOC_KEY - Key for the spreadsheet you created in step 2 (ex: 1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc)

###9. Start application
Type the following command into the command prompt and hit return/enter.

       node client-app.js

Wait for the return prompt: "server started on 8443"

###10. Open localhost [https://localhost:8443/](https://localhost:8443/)
Use your internert browser to navigate to [https://localhost:8443/](https://localhost:8443/). Since this is a demo app on localhost you'll get an invalid certificate message, follow the instructions to accepting the invalid certificate and proceeding to localhost. You now have a sample client application running on your local machine!
