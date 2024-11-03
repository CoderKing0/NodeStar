const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "nodestar",
  user: "root",
  password: "zd123456789",
  connectionPoolLimit: 5,
});

// 测试是否连接成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败");
    return;
  }

  // 使用connection尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败", err);
    } else {
      console.log("数据库连接成功, 可以操作数据库~");
    }
  });
});

module.exports = connectionPool.promise();
