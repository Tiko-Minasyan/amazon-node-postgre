"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			published: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			timesBought: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			earnings: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			UserId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id",
				},
			},
			CategoryId: {
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Categories",
					key: "id",
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Products");
	},
};
