const Color = require("../models/index").Color;

class ColorService {
	async getAll() {
		const colors = await Color.findAll();
		return colors;
	}
}

module.exports = new ColorService();
