"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Colors", [
			{
				name: "red",
				hex: "#E74C3C",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "blue",
				hex: "#1F618D",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "green",
				hex: "#4CAF50",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "yellow",
				hex: "#FFEB3B",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "black",
				hex: "#212121",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "white",
				hex: "#F5F5F5",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "gray",
				hex: "#BDBDBD",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "orange",
				hex: "#FFB300",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "purple",
				hex: "#880E4F",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Colors", null, {});
	},
};
