import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import apiRoutes from './apiRoutes/index.js';
import populateDatabase from './utils/startup.js';
import 'dotenv/config';

// NOTE: make sure your node env is set to 'development' locally

// constants
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/coolcats';
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

mongoose.connect(DB_URL);

if (process.env.NODE_ENV === 'development') {
  // generate some dummy data
  populateDatabase();
}

const app = express();

// middleware

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const sessionOptions = {
  name: 'coolcats.sid', // name of the cookie
  secret: 'secretpassword', // a secret key used to sign the session ID cookie
  resave: false, //don't save session if unmodifed
  saveUninitialized: false, // don't create session until something stored
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// log requests
app.use((req, _res, next) => {
  const info = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} USER: ${req.session['user']?._id} BODY: ${JSON.stringify(req.body)}`;
  console.info(info.substring(0, 1023));
  next();
});

// log responses
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    console.info(
      `[${new Date().toISOString()}] Response: ${req.method} ${req.originalUrl} DATA: ${data}`.substring(
        0,
        1023
      )
    );
    res.send = oldSend;
    return res.send(data);
  };
  next();
});

// routes
app.use('/api', apiRoutes);

app.use('*', (_req, res) => {
  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
