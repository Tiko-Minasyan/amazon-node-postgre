const express = require("express");
const router = express.Router();
const users = require("../services/user.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next) {
	console.log("Users request received. Time: ", new Date());
	next();
});

router.post(
	"/register",
	asyncHandler(async (req, res) => {
		await users.create(req.body);
		res.status(201).send();
	})
);

router.post(
	"/login",
	asyncHandler(async (req, res) => {
		const body = req.body;
		const token = await users.login(body);
		res.json(token);
	})
);

router.get(
	"/profile",
	asyncHandler(async (req, res) => {
		const user = await users.findOne(req.user.id);
		res.json(user);
	})
);

router.patch(
	"/edit",
	asyncHandler(async (req, res) => {
		const body = req.body;
		const result = await users.update(body, req.user.id);
		res.json(result);
	})
);

module.exports = router;
