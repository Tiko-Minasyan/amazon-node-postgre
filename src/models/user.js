"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			const { Product, User, Address, Cart, Order } = models;

			User.hasMany(Product);
			User.hasMany(Address);
			User.hasMany(Cart);
			User.hasMany(Order);
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			isVerified: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
