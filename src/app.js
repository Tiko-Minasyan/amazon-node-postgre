require("dotenv").config({
	path: ".env",
});
const cors = require("cors");
const express = require("express");
const app = express();
const { handleError } = require("./middlewares/error-handler");
const authMiddleware = require("./middlewares/auth");

const users = require("./controllers/user.controller");
const products = require("./controllers/product.controller");
const colors = require("./controllers/color.controller");
const categories = require("./controllers/category.controller");
const addresses = require("./controllers/address.controller");
const carts = require("./controllers/cart.controller");
const orders = require("./controllers/order.controller");

app.use(cors());
app.use(express.json());
app.use(express.static("images"));

app.use(
	authMiddleware.unless({
		path: [
			"/users/login",
			"/users/register",
			"/products",
			"/categories/",
			RegExp(/^\/products\/\d+$/),
			"/products/search",
			"/products/guestCart",
		],
	})
);

app.use("/users", users);
app.use("/products", products);
app.use("/colors", colors);
app.use("/categories", categories);
app.use("/addresses", addresses);
app.use("/carts", carts);
app.use("/orders", orders);

app.use(handleError);

module.exports = app;
