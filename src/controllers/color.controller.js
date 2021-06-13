const express = require("express");
const router = express.Router();
const colors = require("../services/color.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Colors request received. Time: ", new Date());
	next();
});

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const result = await colors.getAll();
		res.json(result);
	})
);

module.exports = router;
