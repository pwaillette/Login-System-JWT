import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// -------- Routes -------- //

app.get('/', (req, res) => {
  res.send('Hey!');
});

export default app;
