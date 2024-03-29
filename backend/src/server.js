import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import apiRoutes from './apiRoutes/index.js';

// constants
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/coolcats';
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

mongoose.connect(DB_URL);

const app = express();

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

// NOTE: make sure your node env is set to 'development' locally
if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}
// middleware
app.use(session(sessionOptions));
app.use(express.json());

// routes
app.use('/api', apiRoutes);

app.use('*', (_req, res) => {
  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
