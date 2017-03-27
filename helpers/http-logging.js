globalLog = require('global-request-logger');
globalLog.initialize(); // Setup http logging
  globalLog.on('success', function(request, response) {
    console.log('Request', request);
    console.log('Response', response);
});
globalLog.on('error', function(request, response) {
  console.log('Request', request);
  console.log('Response', response);
});


