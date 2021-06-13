"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ProductColors", {
			ProductId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			ColorId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("ProductColors");
	},
};
