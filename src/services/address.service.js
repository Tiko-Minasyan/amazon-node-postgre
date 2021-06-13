const Address = require("../models/index").Address;

class AddressService {
	async getAll(id) {
		const addresses = await Address.findAll({
			where: { UserId: id },
			order: [["isDefault", "DESC"]],
		});
		return addresses;
	}

	async get(id) {
		const address = await Address.findOne({ where: { id } });
		return address;
	}

	async add(data, id) {
		if (data.isDefault) {
			await Address.update(
				{ isDefault: false },
				{ where: { isDefault: true } }
			);
		}

		data["UserId"] = id;
		await Address.create(data);
	}

	async edit(id, data) {
		if (data.isDefault) {
			await Address.update(
				{ isDefault: false },
				{ where: { isDefault: true } }
			);
		}

		await Address.update(data, { where: { id } });
	}

	async default(data) {
		await Address.update({ isDefault: false }, { where: { isDefault: true } });
		await Address.update({ isDefault: true }, { where: { id: data.id } });
	}

	async delete(id) {
		await Address.destroy({ where: { id } });
	}
}

module.exports = new AddressService();
