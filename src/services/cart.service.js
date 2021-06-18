const Cart = require("../models/index").Cart;
const Color = require("../models/index").Color;
const Product = require("../models/index").Product;
const Category = require("../models/index").Category;

class CartService {
	async getCart(id) {
		const carts = await Cart.findAll({
			where: { UserId: id },
			include: { all: true },
		});
		return carts;
	}

	async addCart(data, id) {
		for (let key in data) {
			const cart = await Cart.findOne({
				where: { UserId: id, ProductId: key },
			});
			if (!!cart) {
				cart.update({ count: cart.count + data[key].count });
				continue;
			}

			let obj = {};
			obj.UserId = id;
			obj.ProductId = key;
			obj.ColorId = data[key].color;
			obj.count = data[key].count;
			Cart.create(obj);
		}
	}

	async update(data, id) {
		const ProductId = data.id;
		const count = data.count;

		const cart = await Cart.findOne({ where: { UserId: id, ProductId } });
		await cart.update({ count: cart.count + count });
	}

	async addOne(data, id) {
		const ProductId = data.id;
		const ColorId = data.colorId;

		await Cart.create({ ProductId, ColorId, UserId: id, count: 1 });
	}

	async removeOne(ProductId, UserId) {
		await Cart.destroy({ where: { UserId, ProductId } });
	}
}

module.exports = new CartService();
