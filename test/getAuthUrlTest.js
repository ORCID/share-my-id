//sample test file
import test from 'ava';
var OcridOAuthUtil = require('../local_modules/orcid-oauth-util.js').OcridOAuthUtil;

var ooau = new OcridOAuthUtil('client_id_1','client_secrect_1','https://test.com/1','https://test.com/2')

test('test creates correct url',  t => {
    t.is(
    	'https://test.com/1/oauth/authorize?redirect_uri=getAuthUrl&scope=%2Fauthenticate&response_type=code&client_id=client_id_1&show_login=true&state=state1',
    	ooau.getAuthUrl('getAuthUrl','state1')
    ); 
});
