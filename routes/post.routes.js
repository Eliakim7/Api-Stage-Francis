const express = require("express");
const {setItems, getItems, editItems, deleteItems} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getItems);
router.post("/", setItems);
router.put("/:id", editItems)
router.delete("/:id", deleteItems);

module.exports = router;
