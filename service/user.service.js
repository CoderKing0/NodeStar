const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;

    const statement = "INSERT INTO user (name, password) VALUES (?, ?)";

    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    const statement = "SELECT * FROM user WHERE name = ?";

    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
