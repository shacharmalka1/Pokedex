const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const usersPath = `C:/dev/cyber4s/Pokedex/backend/users`;

router.post("", (req, res) => {
  //sign up
  const userName = req.headers.username;
  if (!fs.existsSync(`${usersPath}/${userName}`)) {
    fs.mkdirSync(`${usersPath}/${userName}`); //create new directory by the username
    res.send("you are just signed up");
  } else {
    res.send("This username is already taken try another one....");
  }
});

router.get("/login", (req, res) => {
  //sign in
  const userName = req.headers.username;
  if (fs.existsSync(`${usersPath}/${userName}`)) res.send(true);
  else res.send(false);
});

module.exports = router;
