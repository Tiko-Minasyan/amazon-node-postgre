"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ProductImage extends Model {
		static associate(models) {
			const { ProductImage, Product } = models;

			ProductImage.belongsTo(Product);
		}
	}
	ProductImage.init(
		{
			name: DataTypes.STRING,
			isDefault: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "ProductImage",
		}
	);
	return ProductImage;
};
