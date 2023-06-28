const PostModel = require("../models/Item");

const getItems = async (req, res) => {
  const items = await PostModel.find();
  res.status(200).json(items);
};

const getOneItem = async (req, res) => {
  const item = await PostModel.findById(req.params.id);
  res.status(200).json(item);
};

const setItems = async (req, res) => {
  const item = await PostModel.create({
    name: req.body.name,
    price: req.body.price,
    picture: req.body.picture,
    stock: req.body.stock,
    size: req.body.size,
    color: req.body.color,
    description: req.body.description,
  });
  res.status(200).json(item);
};

const editItems = async (req, res) => {
  const item = await PostModel.findById(req.params.id);
  /* 
  if (!item){
    res.status(400).json({message: "Cet article n'existe pas"})
  } */

  const updateItems = await PostModel.findByIdAndUpdate(item, req.body, {
    new: true,
  });
  res.status(200).json(updateItems);
};

const deleteItems = async (req, res) => {
  await PostModel.deleteOne({_id: req.params.id});

 /*  await item.deleteItems(); */
  res.status(201).json({ message: "Article supprimé : " + req.params.id });
};

module.exports = {
  setItems,
  getItems,
  getOneItem,
  editItems,
  deleteItems,
};
