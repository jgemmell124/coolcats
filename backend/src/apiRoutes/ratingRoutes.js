import express from 'express';
import { ROLES_ENUM  } from '../utils/constants.js';
import * as sandwichDao from '../daos/sandwichDao.js';
import * as userModel from '../models/userModel.js';
import * as ratingDao from '../daos/ratingDao.js';
import ratingModel from '../models/ratingModel.js';
import { getUserSession } from '../utils/session.js';
import { getUserByUsername } from '../daos/userDao.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { sid, username, uid } = req.query;
  const filter = {};
  if (sid) {
    filter.sandwich_id = sid;
  }

  if (uid) {
    filter.user_id = uid;
  }

  if (username) {
    try {
      const user = await getUserByUsername(username);
      if (user) {
        filter.user_id = user._id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const ratings = await ratingModel.find(filter);
    return res.json({ ratings, count: ratings.length }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get ratings');
  }
});

router.post('/', async (req, res) => {
  // only users can create ratings
  // TODO should admin be able to create rating?
  const session = getUserSession(req);

  const { sandwich_id, rating, comment } = req.body;
  if (!session || session.role !== ROLES_ENUM.USER) {
    return res.status(403).send('Unauthorized');
  }

  try {
    const user = await userModel.findById(session._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const sandwich = await sandwichDao.getSandwichById(sandwich_id);
    if (!sandwich) {
      return res.status(404).send('Sandwich not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to find user');
  }

  if (!sandwich_id || !rating) {
    return res.status(400).send('Missing required fields');
  }
  const ratingObj = {
    sandwich_id,
    user_id: session._id,
    rating,
    comment,
  };

  try {
    const newRating = await ratingModel.create(ratingObj);
    return res.json(newRating).status(201);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to create rating');
  }
});


router.put('/:id', async (req, res) => {
  // only users can update their own ratings
  const userSession = getUserSession(req);

  const { id } = req.params;

  try {
    const ratingObj = await ratingModel.findById(id);

    if (!ratingObj) {
      return res.status(404).send('Rating not found');
    }
    const ratingRes = ratingObj.toObject();

    // only users can update their own ratings
    if (!userSession || (userSession._id !== ratingRes.user_id && userSession.role !== ROLES_ENUM.ADMIN)) {
      return res.status(403).send('Unauthorized');
    }

    // can only modify rating and comment
    const { rating, comment, title } = req.body;

    if (!rating && !comment && !title) {
      return res.status(400).send('Updated fields required');
    }

    const updateParams = {};
    if (rating) {
      updateParams.rating = rating;
    }
    if (comment) {
      updateParams.comment = comment;
    }
    if (title) {
      updateParams.title = title;
    }

    const updatedRating = await ratingDao.updateRating(id, updateParams);
    return res.json(updatedRating).status(201);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to find rating');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userSession = getUserSession(req);

  try {
    const rating = await ratingModel.findById(id);
    if (!rating) {
      return res.status(404).send('Rating not found');
    }
    const ratingObj = rating.toObject();
    // only users can delete their own ratings and admins
    if (!userSession || (userSession._id !==  ratingObj.user_id && userSession.role !== ROLES_ENUM.ADMIN)) {
      return res.status(403).send('Unauthorized');
    }
    await ratingDao.deleteRating(id);
    return res.status(204).send('Rating deleted');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to find rating');
  }
});

export default router;
