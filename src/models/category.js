"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			const { Category, Product } = models;

			Category.hasMany(Product);
		}
	}
	Category.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
