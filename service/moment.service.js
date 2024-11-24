const connection = require("../app/database");

class MomentService {
  async create(content, id) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }
  async list(offset, size) {
    const statement = "SELECT * FROM moment LIMIT ? OFFSET ?;";
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }
  async getDetailById(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) author
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async removeById(momentId) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async updateById(momentId, content) {
    const statement = "UPDATE moment SET content = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
}

module.exports = new MomentService();
