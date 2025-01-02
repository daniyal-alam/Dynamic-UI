const express = require("express");
const {
  createUser,
  getInfo,
  deleteUser,
} = require("../controllers/userController");
const { validateInfo } = require("../middleware/validation");

const router = express.Router();

router.post("/addInfo", validateInfo, createUser);
router.get("/getInfo", getInfo);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
