import express from 'express';
import userModel from '../models/userModel.js';
import { ROLES_ENUM  } from '../utils/constants.js';
import * as userDao from '../daos/userDao.js';

const router = express.Router();

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

router.get('/', async (req, res) => {
  // admin can see all users
  // employee can see all users except admin
  // everyone else can only see users with role 'user'

  const { role } = req.query;
  const session = getUserSession(req);

  const baseProjection = {
    password: 0,
    __v: 0,
  };

  const filter = role ? { role } : {};

  if (!session?.role || session.role === ROLES_ENUM.USER) {
    // TODO should users be able to see employees?
    filter.role = ROLES_ENUM.USER;
    Object.assign(baseProjection, { name: 0, email: 0, role: 0 });
  } else if (session.role === ROLES_ENUM.EMPLOYEE) {
    filter.role = {
      $in: [ROLES_ENUM.USER, ROLES_ENUM.EMPLOYEE]
    };
    Object.assign(baseProjection, { name: 0, email: 0 });
  } else if (session.role !== ROLES_ENUM.ADMIN) {
    console.log('session', session);
    // invalid role
    return res.status(403).send('Unauthorized');
  }

  try {
    const users = await userModel.find(filter, baseProjection);
    return res.json({ users, count: users.length }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get users');
  }

});


router.post('/', async (req, res) => {
  // only admin can create an account (for now)
  const userSession = getUserSession(req);

  if (userSession?.role !== ROLES_ENUM.ADMIN) {
    return res.sendStatus(401);
  };

  const { username, email, password, name, role } = req.body;

  if (!username || !email || !password || !name) {
    return res.status(400).send('Missing required fields');
  }

  // the provided role doesn't exist
  if (role && !ROLES_ENUM.ALL.includes(role)) {
    return res.status(400).send('Invalid role');
  }

  const newUser = {
    username,
    email,
    password,
    name,
    role: role ?? ROLES_ENUM.USER,
  };

  try {
    const existingUser = await userDao.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send('Username already in use');
    }
    const existingEmail = await userDao.getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).send('Email already in use');
    }
    const user = await userDao.createUser(newUser);
    return res.status(201).json({ username, role: user.role, _id: user._id });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to create user');
  };
});

router.get('/:username', async (req, res) => {
  // admin can see all user info
  // user can see their own info
  // other users can only see username and _id
  const { username } = req.params;

  try {
    // find user in the database
    const user = await userDao.getUserByUsername(username);

    // don't show admins
    if (!user || user.role === ROLES_ENUM.ADMIN) {
      return res.status(404).send('User not found');
    }

    const userInfo = user.toObject();
    const userSession = getUserSession(req);

    if (userSession?.role === ROLES_ENUM.ADMIN) {
      // admin can see all user info
      return res.json(userSession).status(200);
    } else if (userSession?.username === username) {
      // user can see their own info
      return res.json(userInfo).status(200);
    } else {
      // other users can only see username and _id
      return res.json({ username: userInfo.username, _id: userInfo._id }).status(200);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get user');
  }
});

router.put('/:username', async (req, res) => {
  // admin can update any account
  // user can update their own account
  const { username } = req.params;
  const { role, ...updateParams } = req.body;

  const userSession = getUserSession(req);

  if (!userSession || (userSession.username !== username && userSession.role !== ROLES_ENUM.ADMIN)) {
    return res.status(403).send('Unauthorized');
  }

  try {
    // only admin can update role
    if (userSession.role === ROLES_ENUM.ADMIN) {
      if (role && !ROLES_ENUM.ALL.includes(role)) {
        return res.status(400).send('Invalid role');
      } else if (role) {
        updateParams.role = role;
      }
    }
    const updatedUser = await userDao.updateUser(username, updateParams);
    return res.json(updatedUser).status(201);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to update user');
  }
});

router.delete('/:username', async (req, res) => {
  // admin can delete any account
  // user can delete their own account
  const { username } = req.params;
  const userSession = getUserSession(req);

  if (!userSession || (userSession.username !== username && userSession.role !== ROLES_ENUM.ADMIN)) {
    return res.status(403).send('Unauthorized');
  }
  try {
    await userDao.deleteUser(username);
    // if a use deletes itself
    if (userSession.username === username) {
      req.session.destroy();
    }
    return res.status(202).send('User deleted');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to delete user');
  }
});

export default router;
