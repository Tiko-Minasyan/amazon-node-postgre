"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			const { Cart, Color, Product, User, Category } = models;

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
