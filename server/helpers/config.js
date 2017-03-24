module.exports = config = {
  //ORCID API config
  CLIENT_ID: 'APP-3BI8IQ5O8DREEAVF',
  CLIENT_SECRET: '35d8f715-9121-440c-ad34-b66cb8c4e884',
  ORCID_URL: 'https://sandbox.orcid.org',
  //Google API config
  DEFAULT_GSHEET_ID: '1_srGxfEjCHq_kUDTAO3mJxOjCQ0UJQGjymlvBMNe4Zc',//Key from Google spreadsheet URL https://docs.google.com/spreadsheets/d/1_srGxfEjCHq_kUDTAO3mJxOjCQ0UJQGjymlvBMNe4Zc/edit?usp=sharing
  //Server SSL config
  FORCE_SSL: 'true', // must be 'true' or 'false'
  LETSENCRYPT_ISSUES_EMAIL: 'orcid-id-to-gdoc@mailinator.com', // Where to email when certificates expire.
  AUTO_SNI_DEBUG: 'true', // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  DOMAINS: 'localhost,www.localhost', // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  PORT_HTTP: '8080', // Optionally override the default http port.
  PORT_HTTPS: '8443', // Optionally override the default https port.
  HOST: 'https://localhost:8443'
}

// Environment variables overrides
for (key in config)
	if (process.env[key] != undefined)
		config[key] = process.env[key];
