import express from 'express';
import { ROLES_ENUM  } from '../utils/constants.js';
import * as sandwichDao from '../daos/sandwichDao.js';
import { getUserSession } from '../utils/session.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sandwich = await sandwichDao.getSandwichById(id);
    if (!sandwich) {
      return res.status(404).send('Sandwich not found');
    }
    return res.status(202).json(sandwich);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get sandwich');
  }
});

router.get('/', async (_req, res) => {
  // all users can see the sandwiches
  try {
    const sandwiches = await sandwichDao.getAllSandwiches();
    return res.json({ sandwiches, count: sandwiches.length }).status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to get sandwiches');
  }
});

router.post('/', async (req, res) => {
  // only employees and admins can create sandwiches
  const session = getUserSession(req);
  if (!session || (session.role !== ROLES_ENUM.EMPLOYEE && session.role !== ROLES_ENUM.ADMIN)) {
    return res.status(403).send('Unauthorized');
  }

  const { name, price, ingredients, description } = req.body;

  if (!name || !price || !ingredients || !description) {
    return res.status(400).send('Missing required fields');
  }

  const sandwich = {
    name,
    price,
    ingredients,
    description,
  };

  try {
    const newSandwich = await sandwichDao.createSandwich(sandwich);
    return res.json(newSandwich).status(201);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to create sandwich');
  }
});

router.put('/:id', async (req, res) => {
  // only admins and employees can update sandwiches
  const { id } = req.params;
  const session = getUserSession(req);
  if (!session || (session.role !== ROLES_ENUM.EMPLOYEE && session.role !== ROLES_ENUM.ADMIN)) {
    return res.status(403).send('Unauthorized');
  }

  if (!req.body) {
    return res.status(400).send('Updated fields required');
  }

  try {
    const sandwich = await sandwichDao.getSandwichById(id);
    if (!sandwich) {
      return res.status(404).send('Sandwich not found');
    }
    const updatedSandwich = await sandwichDao.updateSandwich(id, req.body);
    return res.status(201).json(updatedSandwich);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to update sandwich');
  }
});


router.delete('/:id', async (req, res) => {
  // only admins and employees can delete sandwiches
  const { id } = req.params;

  const session = getUserSession(req);
  if (!session || (session.role !== ROLES_ENUM.EMPLOYEE && session.role !== ROLES_ENUM.ADMIN)) {
    return res.status(403).send('Unauthorized');
  }

  try {
    await sandwichDao.deleteSandwich(id);
    return res.status(202).send('Sandwich deleted');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Failed to delete sandwich');
  }
});

export default router;
