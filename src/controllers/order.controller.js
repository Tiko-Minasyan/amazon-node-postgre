const express = require("express");
const router = express.Router();
const orders = require("../services/order.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Orders request received. Time: ", new Date());
	next();
});

router.get(
	"/checkout",
	asyncHandler(async (req, res) => {
		await orders.create(req.user.id);
		res.send();
	})
);

router.get(
	"/myorders",
	asyncHandler(async (req, res) => {
		const result = await orders.getAll(req.user.id);
		res.json(result);
	})
);

module.exports = router;
