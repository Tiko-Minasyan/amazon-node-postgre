const express = require("express");
const router = express.Router();
const products = require("../services/product.service");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = multer();

router.use(function timeLog(req, res, next) {
	console.log("Products request received. Time: ", new Date());
	next();
});

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const result = await products.getAll();
		res.json(result);
	})
);

router.post(
	"/create",
	asyncHandler(async (req, res) => {
		const product = await products.create(req.body, req.user.id);
		res.status(201).json(product);
	})
);

router.get(
	"/myproducts",
	asyncHandler(async (req, res) => {
		const results = await products.findProducts(req.user.id);
		res.json(results);
	})
);

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const product = await products.findProduct(req.params.id);
		res.json(product);
	})
);

router.patch(
	"/:id",
	asyncHandler(async (req, res) => {
		const result = await products.editProduct(req.body);
		res.json(result);
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		await products.deleteProduct(req.params.id);
		res.send();
	})
);

router.post(
	"/search",
	asyncHandler(async (req, res) => {
		const result = await products.searchProducts(req.body);
		res.json(result);
	})
);

router.post(
	"/guestCart",
	asyncHandler(async (req, res) => {
		const result = await products.guestCart(req.body);
		res.json(result);
	})
);

router.post(
	"/addImage/:id",
	upload.array("files", 9),
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await products.addImage(req.files, id);
		res.status(201).send();
	})
);

router.get(
	"/images/defaults",
	asyncHandler(async (req, res) => {
		const result = await products.getDefaultImages();
		res.json(result);
	})
);

router.get(
	"/images/all/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const result = await products.getProductImages(id);
		res.json(result);
	})
);

router.post(
	"/images/makeDefault/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await products.makeDefaultImg(id, req.body);
		res.send();
	})
);

router.post(
	"/images/delete/:id",
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await products.deleteImg(id, req.body);
		res.send();
	})
);

router.post(
	"/images/orders",
	asyncHandler(async (req, res) => {
		const result = await products.orderImages(req.body);
		res.json(result);
	})
);

module.exports = router;
