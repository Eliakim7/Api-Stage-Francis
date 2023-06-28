const express = require("express");
const {setItems, getItems, editItems, deleteItems, getOneItem} = require("../controllers/post.controller");
const router = express.Router();

router.get("/get", getItems);
router.get("/detail/:id", getOneItem);
router.post("/", setItems);
router.put("/:id", editItems)
router.delete("/delete/:id", deleteItems);

module.exports = router;
