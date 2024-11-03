const crypto = require("crypto");

function md5(str) {
  const md5 = crypto.createHash("md5");

  return md5.update(String(str)).digest("hex");
}

module.exports = md5;
