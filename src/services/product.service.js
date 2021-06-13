const Product = require("../models/index").Product;
const Color = require("../models/index").Color;
const Category = require("../models/index").Category;
const { Op } = require("sequelize");

class ProductService {
	async getAll() {
		const products = await Product.findAll({
			where: { published: true },
			include: [Color, Category],
		});
		return products;
	}

	async create(data, id) {
		data["UserId"] = id;
		const product = await Product.create(data);
		for (let item in data.colors) {
			const color = await Color.findByPk(data.colors[item]);
			await product.addColor(color);
		}
		return;
	}

	async findProducts(id) {
		const products = await Product.findAll({
			where: { UserId: id },
			include: [Color, Category],
		});
		return products;
	}

	async findProduct(id) {
		const product = await Product.findOne({
			where: { id },
			include: [Color, Category],
		});
		return product;
	}

	async editProduct(data) {
		console.log(data);
		const product = await Product.findOne({ where: { id: data.id } });
		await product.update(data, { where: { id: data.id } });

		const productColors = await product.getColors();
		const colorsArr = [];

		productColors.forEach((color) => {
			if (!data.colors.includes(color.dataValues.id)) {
				product.removeColor(color.dataValues.id);
			} else {
				colorsArr.push(color.dataValues.id);
			}
		});
		data.colors.forEach((color) => {
			if (!colorsArr.includes(color)) {
				product.addColor(color);
			}
		});
	}

	deleteProduct(id) {
		return Product.destroy({ where: { id } });
	}

	async searchProducts(data) {
		const search = {};
		if (data.category) search["CategoryId"] = data.category;
		if (data.text) search["name"] = data.text.toLowerCase();
		else search["name"] = "";

		const products = await Product.findAll({
			where: {
				...search,
				name: { [Op.iLike]: `%${search.name}%` },
				published: true,
			},
			include: [Color, Category],
		});
		return products;
	}

	async guestCart(data) {
		const cartProducts = [];

		for (let id in data) {
			const product = await Product.findOne({
				where: { id },
				include: [Color, Category],
			});

			product.dataValues.count = data[id].count;
			cartProducts.push(product);
		}

		return cartProducts;
	}
}

module.exports = new ProductService();
