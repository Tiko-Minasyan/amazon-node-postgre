"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Color extends Model {
		static associate(models) {
			const { Color, Product, Cart, Order } = models;

			Color.belongsToMany(Product, { through: "ProductColors" });
			Color.hasMany(Cart);
			Color.hasMany(Order);
		}
	}
	Color.init(
		{
			name: DataTypes.STRING,
			hex: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Color",
		}
	);
	return Color;
};
