const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.post('/categories', async (req, res) => {
  const id = await Category.create(req.body);
  res.status(201).send({ id });
});

router.get('/categories', async (req, res) => {
  const categories = await Category.readAll();
  res.status(200).send(categories);
});

router.put('/categories/:id', async (req, res) => {
  await Category.update(req.params.id, req.body);
  res.status(204).send();
});

router.delete('/categories/:id', async (req, res) => {
  await Category.delete(req.params.id);
  res.status(204).send();
});

module.exports = router;