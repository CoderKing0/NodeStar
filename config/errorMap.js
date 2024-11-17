const errorMap = {
  "-1001": {
    code: -1001,
    message: "用户名或者密码不能为空~",
  },
  "-1002": {
    code: -1002,
    message: "用户名已经被占用, 请输入新的用户名~",
  },
  "-1003": {
    code: -1003,
    message: "用户不存在~",
  },
  "-1004": {
    code: -1004,
    message: "登录密码错误~",
  },
  "-1005": {
    code: -1005,
    message: "未携带token~",
  },
  "-1006": {
    code: -1006,
    message: "token错误或已过期~",
  }
};

module.exports = errorMap;
