const jwt = require("jsonwebtoken");

const jwtSign = (userPayload: any, expiresIn = "15m") => {
  return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
};

const jwtVerify = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export { jwtSign, jwtVerify };
