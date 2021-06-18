const Order = require("../models/index").Order;
const Cart = require("../models/index").Cart;
const { v4: uuid } = require("uuid");

class OrderService {
	async create(id) {
		const cart = await Cart.findAll({ where: { UserId: id } });
		const orderId = id + "-" + uuid();
		console.log(id);
		for (let item of cart) {
			const order = {};
			order.orderId = orderId;
			order.count = item.count;
			order.ProductId = item.ProductId;
			order.UserId = id;
			order.ColorId = item.ColorId;
			console.log(order);
			await Order.create(order);
		}
		await Cart.destroy({ where: { UserId: id } });
	}

	async getAll(id) {
		const orders = await Order.findAll({
			where: { UserId: id },
			include: { all: true },
			order: [["createdAt", "DESC"]],
		});
		let ordersGroup = {};
		for (let order of orders) {
			if (typeof ordersGroup[order.orderId] === "undefined") {
				ordersGroup[order.orderId] = [];
			}

			ordersGroup[order.orderId].push(order);
		}

		return ordersGroup;
	}
}

module.exports = new OrderService();
