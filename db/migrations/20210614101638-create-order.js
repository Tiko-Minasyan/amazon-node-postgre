"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			orderId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			count: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			ProductId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Products",
					key: "id",
				},
			},
			UserId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			ColorId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Colors",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Orders");
	},
};
