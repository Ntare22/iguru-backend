import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

dotenv.config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to IGURU.',
  })
);

app.listen(process.env.PORT || 8080, () =>
  console.log(`app listening on port ${process.env.PORT}!`)
);

export default app;
