const express = require("express");
const router = express.Router();
const addresses = require("../services/address.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Addresses request received. Time: ", new Date());
	next();
});

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const result = await addresses.getAll(req.user.id);
		res.json(result);
	})
);

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const result = await addresses.get(id);
		res.json(result);
	})
);

router.post(
	"/add",
	asyncHandler(async (req, res) => {
		await addresses.add(req.body, req.user.id);
		res.status(201).send();
	})
);

router.post(
	"/default",
	asyncHandler(async (req, res) => {
		await addresses.default(req.body);
		res.send();
	})
);

router.patch(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await addresses.edit(id, req.body);
		res.send();
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await addresses.delete(id);
		res.send();
	})
);

module.exports = router;
