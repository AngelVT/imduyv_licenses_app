import app from './app.js';
import config from './config.js';
import fs from 'fs';
import https from 'https';

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};

https.createServer(options, app).listen(config.APP_PORT, function(error) {
    if (error) {
        console.error('Error starting HTTPS server:', error);
    } else {
        console.log('Server running on port', config.APP_PORT);
    }
});
/*app.listen(config.APP_PORT);
console.log("Server running on port: ", config.APP_PORT)*/