import express from 'express';
const router = express.Router();
import * as userDao from '../daos/userDao.js';

const getUserSession = (req) => {
  return req.session['user'];
};

const setUserSession = (req, user) => {
  const userSessionInfo = {
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    _id: user._id,
  };
  req.session['user'] = userSessionInfo;

  return userSessionInfo;
};

router.get('/session', async (req, res) => {
  const userSession = getUserSession(req);
  if (!userSession?._id) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const user = await userDao.getUserById(userSession._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    return res.json(setUserSession(req, user)).status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and Password Required');
  }

  try {
    const user = await userDao.findUserByCredentials(username, password);
    if (!user) {
      return res.status(400).send('Username or password is incorrect');
    }
    // save the session
    const userSessionInfo = setUserSession(req, user);

    return res.json(userSessionInfo).status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Could not log in');
  }
});


router.post('/logout', (req, res) => {
  req.session?.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to log out');
    } else {
      return res.sendStatus(204);
    }
  });
});

export default router;
