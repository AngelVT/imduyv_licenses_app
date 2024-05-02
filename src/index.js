import app from './app.js';
import config from './config.js';
import https from 'https';

https.createServer(config.HTTPS_OPTIONS, app).listen(config.APP_PORT, function(error) {
    if (error) {
        console.error('Error starting HTTPS server:', error);
    } else {
        console.log('Server running on port', config.APP_PORT);
    }
});
/*app.listen(config.APP_PORT);
console.log("Server running on port: ", config.APP_PORT)*/