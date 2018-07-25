module.exports = config = {
  //ORCID API config
  CLIENT_ID: 'APP-3BI8IQ5O8DREEAVF',
  CLIENT_SECRET: '35d8f715-9121-440c-ad34-b66cb8c4e884',
  ORCID_URL: 'https://sandbox.orcid.org',
  SUPPORT_URL: 'https://support.orcid.org',
  PORT_HTTP: '8080', // Optionally override the default http port.
  HOST: 'http://localhost:8080',
  /*
	for development setup goto mongo console
	  use smid;
	  db.createUser({
	    user: "smid_user",
	    pwd: "devpassword",
	    roles: ["readWrite"]
	});
  */
  MONGO_CONNECTION_STRING: 'smid_user:devpassword@127.0.0.1:27017/smid',
  /* mailgun tkeys */
  MAILGUN_PRIV_API_KEY: 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0', // test key from mailgun docs
  MAILGUN_PUB_API_KEY: 'pubkey-34mudp0r5-xfoewxwkxfo01-op6t6ed0', // our public key
 
  MAILGUN_DOMAIN: 'samples.mailgun.org', // test domian from mailgun docs
  RAID_BASE_URL: 'https://api.raid.org.au/v1/RAiD',
  RAID_TOKEN: '<<RAID JWT TOKEN>>',

}

// Environment variables overrides
for (key in config)
  if (process.env[key] != undefined)
    config[key] = process.env[key];

console.log("config: ", config);
