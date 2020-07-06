import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to IGURU.',
  })
);

app.listen(process.env.PORT || 8080, () =>
  console.log(`app listening on port ${process.env.PORT}!`),
);

export default app;
