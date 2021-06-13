"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Categories", [
			{
				name: "Arts",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Books",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Electronics",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Fashion",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Health",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Home",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Sports",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Tools",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Games",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Categories", null, {});
	},
};
