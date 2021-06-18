"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			const { Order, Color, Product, User } = models;

			Order.belongsTo(Product);
			Order.belongsTo(Color);
			Order.belongsTo(User);
		}
	}
	Order.init(
		{
			orderId: DataTypes.STRING,
			count: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
