const User = require("../models").User;
const { NotFound, Forbidden } = require("http-errors");
const jwt = require("jsonwebtoken");

class UserService {
	create(data) {
		return User.create(data);
	}

	async login(data) {
		const user = await User.findOne({ where: { email: data.email } });
		if (!user) throw new NotFound("User not found!");
		if (user.password !== data.password) throw new Forbidden("Wrong password!");

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			}
		);

		return token;
	}

	async findOne(id) {
		const user = await User.findOne({ where: { id } });
		if (!user) throw new NotFound("User not found!");
		return user;
	}

	async update(data, id) {
		let user = await this.findOne(id);

		// if (data.password !== "") {
		// 	if (user.password !== data.oldPassword)
		// 		throw new Forbidden("Wrong password!");
		// 	user.password = data.password;
		// }

		return user.update({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
		});
	}
}

module.exports = new UserService();
