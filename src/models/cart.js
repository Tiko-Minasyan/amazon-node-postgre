"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		static associate(models) {
			const { Cart, Color, Product, User } = models;

			Cart.belongsTo(User);
			Cart.belongsTo(Product);
			Cart.belongsTo(Color);
		}
	}
	Cart.init(
		{
			count: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Cart",
		}
	);
	return Cart;
};
