const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/products', async (req, res) => {
  const id = await Product.create(req.body);
  res.status(201).send({ id });
});

router.get('/products', async (req, res) => {
  const products = await Product.readAll();
  res.status(200).send(products);
});

router.put('/products/:id', async (req, res) => {
  await Product.update(req.params.id, req.body);
  res.status(204).send();
});

router.delete('/products/:id', async (req, res) => {
  await Product.delete(req.params.id);
  res.status(204).send();
});

module.exports = router;