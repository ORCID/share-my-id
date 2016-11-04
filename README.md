# orcid-id-to-gdoc
Simple node.js app that collects authenticated ORCID iDs and uploads them to a Google document.

## Quickstart Installation

###1. Install NodeJS or Upgrade 

[Install it!](https://nodejs.org/)
or 
[Upgrade it!](http://davidwalsh.name/upgrade-nodejs)

###2. Download Project

Download [zip file](https://github.com/ORCID/orcid-id-to-gdoc-master/archive/master.zip) and
 unzip.
   
###3. Open a command prompt

* **Windows**
 
    Select `Search programs and files` type in `node.js command prompt` and select `Node.js command prompt`.
    
* **OSX**
 
    Open terminal by clicking `Search Spotlight` typing in `Terminal` and selecting Terminal.


###4. Point the command prompt to the ```orcid-id-to-gdoc-master``` directory that you just downloaded

* **Windows**

        cd Downloads/orcid-id-to-gdoc-master

* **OSX**

        cd Downloads/orcid-id-to-gdoc-master

###5. Install client app node dependencies
Type the following command into the command prompt and hit return.

       npm install 

###6. Configure Google API service account credentials
Follow instructions at : https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method

###7. Place the JSON key file downloaded from Google inside your ```orcid-id-to-gdoc-master``` directory

###8. Create a new Google spreadsheet and share it with your service account
* IMPORTANT! Set row 1 column 1-4 values to 'date', 'name', 'orcid', 'share info'
* Make note of the file 'key' - the unique string of letters and numbers included in the file URL. Ex: for URL https://docs.google.com/spreadsheets/d/1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc/edit, key is ```1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc```
        
###9. Configure ORCID API credentials. 
This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own  
sandbox credentials - register for sandbox credentials at:
[http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application). 

###9. Add API credentials to confile file
Open ```config.js``` in a text editor, customize the environment variables below, and save the file.

The following configuration variables can be set when starting the client application:

* CLIENT_ID - Client id issued by ORCID.
* CLIENT_SECRET - Client secret issued by ORCID
* REDIRECT_URI - Link user is sent back to with OAuth2 authorization code.
* AUTHORIZE_URI - https://sandbox.orcid.org or https://orcid.org
* TOKEN_EXCHANGE_URI - https://sandbox.orcid.org/oauth/token or https://orcid.org/oauth/token
* GOOGLE_DOC_KEY - Key for the spreadsheet you created in step 2 (ex: 1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc)
* GOOGLE_SERVICE_ACCOUNT_KEY - Path to the JSON key file downloaded from Google in step 1 (ex: ./key.json)

###10. Start application
Type the following command into the command prompt and hit return/enter.

       node client-app.js

Wait for the return prompt: "server started on 8443"

###11. Open localhost [https://localhost:8443/](https://localhost:8443/)
Use your internert browser to navigate to [https://localhost:8443/](https://localhost:8443/). Since this is a demo app on localhost you'll get an invalid certificate message, follow the instructions to accepting the invalid certificate and proceeding to localhost. You now have a sample client application running on your local machine!
