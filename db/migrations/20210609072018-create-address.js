"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Addresses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			address1: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address2: {
				type: Sequelize.STRING,
			},
			country: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
			},
			zip: {
				type: Sequelize.STRING,
			},
			isDefault: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			UserId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Addresses");
	},
};
