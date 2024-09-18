
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [
    {
      name: { type: String, required: true },
      products: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          unit: { type: String, required: true }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
categorySchema.statics.create = async function (data) {
  const category = new this(data);
  await category.save();
  return category._id;
};

categorySchema.statics.readAll = async function () {
  return this.find({});
};

categorySchema.statics.update = async function (id, data) {
  await this.findByIdAndUpdate(id, data);
};

categorySchema.statics.delete = async function (id) {
  await this.findByIdAndDelete(id);
};

categorySchema.statics.addSubcategory = async function (categoryId, subcategory) {
  await this.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory } });
};

categorySchema.statics.removeSubcategory = async function (categoryId, subcategory) {
  await this.findByIdAndUpdate(categoryId, { $pull: { subcategories: subcategory } });
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;