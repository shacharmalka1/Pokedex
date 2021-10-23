const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const usersPath = `C:/dev/cyber4s/Pokedex/backend/users`;

router.post("", (req, res) => {
  try {
    const userName = req.headers.username;
    fs.mkdirSync(`${usersPath}/${userName}`);
  } catch {
    res.status(422).send("This username is already taken try another one....");
  }
});

module.exports = router;
