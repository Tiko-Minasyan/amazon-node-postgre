const express = require("express");
const router = express.Router();
const carts = require("../services/cart.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Carts request received. Time: ", new Date());
	next();
});

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const cart = await carts.getCart(req.user.id);
		res.json(cart);
	})
);

router.post(
	"/",
	asyncHandler(async (req, res) => {
		await carts.addCart(req.body, req.user.id);
		res.status(201).send();
	})
);

router.patch(
	"/",
	asyncHandler(async (req, res) => {
		await carts.update(req.body, req.user.id);
		res.send();
	})
);

router.post(
	"/addOne",
	asyncHandler(async (req, res) => {
		await carts.addOne(req.body, req.user.id);
		res.status(201).send();
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await carts.removeOne(id, req.user.id);
		res.send();
	})
);

module.exports = router;
