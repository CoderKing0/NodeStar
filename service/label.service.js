const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO labels (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async list() {
    const statement = `SELECT * FROM labels;`;
    const [result] = await connection.execute(statement);
    return result;
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM labels WHERE name=?;`;
    const [result] = await connection.execute(statement, [name]);
    return !!(result.length > 0);
  }
}

module.exports = new LabelService();
