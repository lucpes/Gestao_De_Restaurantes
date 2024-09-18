const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.post('/categories', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).send(category);
});

router.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.status(200).send(categories);
});

router.put('/categories/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(category);
});

router.delete('/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.post('/categories/:id/subcategories', async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.subcategories.push(req.body);
  await category.save();
  res.status(201).send(category);
});

router.put('/categories/:categoryId/subcategories/:subcategoryId', async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  const subcategory = category.subcategories.id(req.params.subcategoryId);
  Object.assign(subcategory, req.body);
  await category.save();
  res.status(200).send(category);
});

router.delete('/categories/:categoryId/subcategories/:subcategoryId', async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  category.subcategories.id(req.params.subcategoryId).remove();
  await category.save();
  res.status(204).send();
});

module.exports = router;