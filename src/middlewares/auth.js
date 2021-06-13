const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	try {
		let token = req.header("Authorization").split(" ")[1];
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
	} catch (e) {
		console.log("UNAUTHORIZED:", req.url);
		return next(new Unauthorized("Not authorized"));
	}

	next();
};

authMiddleware.unless = require("express-unless");

module.exports = authMiddleware;
