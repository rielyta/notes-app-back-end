import https from 'https';
import fs from 'fs';
import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', routes);

const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running at https://0.0.0.0:${port}`);
});