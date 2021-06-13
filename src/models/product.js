"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			const { Color, Product, User, Category, Cart } = models;

			Product.belongsToMany(Color, { through: "ProductColors" });
			Product.belongsTo(User);
			Product.belongsTo(Category);
			Product.hasMany(Cart);
		}
	}
	Product.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			brand: DataTypes.STRING,
			price: DataTypes.NUMBER,
			published: DataTypes.BOOLEAN,
			timesBought: DataTypes.NUMBER,
			earnings: DataTypes.NUMBER,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
