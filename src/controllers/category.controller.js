const express = require("express");
const router = express.Router();
const categories = require("../services/category.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Categories request received. Time: ", new Date());
	next();
});

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const result = await categories.getAll();
		res.json(result);
	})
);

module.exports = router;
