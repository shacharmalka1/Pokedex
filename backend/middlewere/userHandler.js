const {
  errorfunc,
} = require("C:/dev/cyber4s/Pokedex/backend/middlewere/errorHandler.js");
const handleUserName = function (req, res, next) {
  const userName = req.headers.username;
  if (userName === undefined) return errorfunc.noAuth(null, req, res);
  else {
    req.username = userName;
    next();
  }
};
module.exports = {
  handleUserName,
};
