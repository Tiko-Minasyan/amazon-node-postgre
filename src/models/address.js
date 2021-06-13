"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Address extends Model {
		static associate(models) {
			const { Address, User } = models;

			Address.belongsTo(User);
		}
	}
	Address.init(
		{
			address1: DataTypes.STRING,
			address2: DataTypes.STRING,
			country: DataTypes.STRING,
			city: DataTypes.STRING,
			state: DataTypes.STRING,
			zip: DataTypes.STRING,
			isDefault: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Address",
		}
	);
	return Address;
};
