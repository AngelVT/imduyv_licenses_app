import app from './app.js';
import config from './config.js';

app.listen(config.APP_PORT);
console.log("Server running on port: ", config.APP_PORT)