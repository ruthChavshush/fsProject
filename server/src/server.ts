import app from './app';
import logger from './utils/logger.util';
import https from 'https';
import http from 'http';
import fs from 'fs';

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  console.log('development');
  http.createServer(app).listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
  });
} else {
  console.log('PRODUCTION');
  const options2 = {
    key: fs.readFileSync('../client-key.pem'),
    cert: fs.readFileSync('../client-cert.pem')
  };
  https.createServer(options2, app).listen(process.env.HTTPS_PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
  });
}