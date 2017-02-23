# orcid-id-to-gdoc
Simple node.js app that collects authenticated ORCID iDs and uploads them to a Google document.

## Quickstart Installation

###1. Install NodeJS or Upgrade 

[Install it!](https://nodejs.org/)
or 
[Upgrade it!](http://davidwalsh.name/upgrade-nodejs)

###2. Download Project

Download [zip file](https://github.com/ORCID/orcid-id-to-gdoc/archive/master.zip) and
 unzip.
   
###3. Open a command prompt

* **Windows**
 
    Select `Search programs and files` type in `node.js command prompt` and select `Node.js command prompt`.
    
* **OSX**
 
    Open terminal by clicking `Search Spotlight` typing in `Terminal` and selecting Terminal.


###4. Point the command prompt to the ```orcid-id-to-gdoc-master``` directory that you just downloaded

        cd Downloads/orcid-id-to-gdoc-master


###5. Install client app node dependencies
Enter the following command into the command prompt.

       npm install 

###6. Configure Google API service account credentials
Follow instructions at : https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method

Once the account is configured get the email address for it by clicking on the account.
	

###7. Place the JSON key file downloaded from Google as part of step 6 inside your ```orcid-id-to-gdoc-master``` directory

Change the file name to key.json if you want to use the default configuration

###8. Create a new Google spreadsheet and share it with your service account

* Go to [http://drive.google.com](http://drive.google.com/) then select New and Google Sheets
* IMPORTANT! Set row 1 column 1-4 values to 'date', 'name', 'orcid', 'share info'
* Click the share button, and the share the file with your Service Account email address from step 6
* Make note of the file 'key' - the unique string of letters and numbers included in the file URL. Ex: for URL https://docs.google.com/spreadsheets/d/1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc/edit, key is ```1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc```
        
###9. Configure ORCID API credentials. 
This example is configured with default test credentials on the ORCID Sandbox. You can optionally supply your own  
sandbox credentials - register for sandbox credentials at:
[http://orcid.org/content/register-client-application](http://orcid.org/content/register-client-application). 
When registering include the redirect_uri 'https://localhost'

###10. Add API credentials to config file
Open ```config.js``` from the helper folder in a text editor, customize the environment variables below, and save the file.

The following configuration variables can be set when starting the client application:

* CLIENT_ID - Client id issued by ORCID.
* CLIENT_SECRET - Client secret issued by ORCID
* REDIRECT_URI - Link user is sent back to with OAuth2 authorization code.
* AUTHORIZE_URI - https://sandbox.orcid.org or https://orcid.org
* TOKEN_EXCHANGE_URI - https://sandbox.orcid.org/oauth/token or https://orcid.org/oauth/token
* GOOGLE_DOC_KEY - Key for the spreadsheet you created in step 2 (ex: 1_srGiuEjCHq_kIPWAO7mJxOjCQ0UJQGjymopHJKe4Zc)
* GOOGLE_SERVICE_ACCOUNT_KEY - Path to the JSON key file downloaded from Google in step 1 (ex: ./key.json)

###11. Start application
Type the following command into the command prompt and hit return/enter.

       node client-app.js

Wait for the return prompt: "server started on 8443"

###12. Open localhost [https://localhost:8443/](https://localhost:8443/)
Use your internert browser to navigate to [https://localhost:8443/](https://localhost:8443/). Since this is a demo app on localhost you'll get an invalid certificate message, follow the instructions to accepting the invalid certificate and proceeding to localhost. You now have a sample client application running on your local machine!

###Tips:

* You get a 400 error `DNS name does not have enough labels`. Means the local `~/letsencrypt/*` directory is corrupt from switching node apps. Clear the letsencrypt directory to reset `rm -rf ~/letsencrypt/*` 
