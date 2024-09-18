const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
});

productSchema.statics.create = async function (data) {
  const product = new this(data);
  await product.save();
  return product._id;
};

productSchema.statics.readAll = async function () {
  return this.find({});
};

productSchema.statics.update = async function (id, data) {
  await this.findByIdAndUpdate(id, data);
};

productSchema.statics.delete = async function (id) {
  await this.findByIdAndDelete(id);
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;