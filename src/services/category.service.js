const Category = require("../models/index").Category;

class CategoryService {
	async getAll() {
		const categories = await Category.findAll();
		return categories;
	}
}

module.exports = new CategoryService();
