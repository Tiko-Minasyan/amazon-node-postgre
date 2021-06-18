const Product = require("../models/index").Product;
const Color = require("../models/index").Color;
const Category = require("../models/index").Category;
const ProductImage = require("../models/index").ProductImage;
const { Op } = require("sequelize");
const fs = require("fs");
const { Forbidden } = require("http-errors");
const { v4: uuid } = require("uuid");
const path = require("path");

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
		return product;
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

	async addImage(files, id) {
		const allowedExtensions = [".jpg", ".jpeg", ".png"];
		files.forEach((file) => {
			if (!allowedExtensions.includes(path.extname(file.originalname)))
				throw new Forbidden("File is not an image!");
		});

		const imgPath = `${__dirname}/../../images/`;
		const images = await ProductImage.findAll({ where: { ProductId: id } });

		if (images.length + files.length > 9)
			throw new Forbidden("Too many images!");

		for (let i = 0; i < files.length; i++) {
			const name = `${id}-${i}-${uuid()}.jpg`;
			fs.writeFileSync(`${imgPath}/${name}`, files[i].buffer);
			if (i === 0 && images.length === 0) {
				await ProductImage.create({ ProductId: id, name, isDefault: true });
			} else await ProductImage.create({ ProductId: id, name });
		}
	}

	async getDefaultImages() {
		const images = await ProductImage.findAll({
			where: { isDefault: true },
			include: Product,
		});
		return images;
	}

	async getProductImages(id) {
		const images = await ProductImage.findAll({
			where: { ProductId: id },
			include: Product,
			order: [["isDefault", "DESC"]],
		});
		return images;
	}

	async makeDefaultImg(id, data) {
		const ProductId = data.id;
		await ProductImage.update({ isDefault: false }, { where: { ProductId } });
		await ProductImage.update({ isDefault: true }, { where: { id } });
	}

	async deleteImg(id, data) {
		const ProductId = data.id;
		const img = await ProductImage.findOne({ where: { id } });
		if (img.isDefault) {
			const images = await ProductImage.findAll({
				where: { ProductId },
				order: [["isDefault", "DESC"]],
			});
			if (images.length > 1) {
				const newDefault = images[1];
				await newDefault.update({ isDefault: true });
			}
		}

		const name = img.name;
		fs.unlinkSync(`${__dirname}/../../images/${name}`);

		await img.destroy({ where: { id } });
	}

	async orderImages(data) {
		const images = [];

		for (let id of data) {
			const image = await ProductImage.findOne({
				where: { ProductId: id, isDefault: true },
			});

			if (image) images.push(image);
		}

		return images;
	}
}

module.exports = new ProductService();
