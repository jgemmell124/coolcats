import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

// constansts
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
  secret: 'secretpassword',
  resave: false,
  saveUninitialized: false,
};

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
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
