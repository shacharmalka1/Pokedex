// const express = require("express");
// const app = express();
// const port = 8080;

// app.get("/", (req, res) => {
//   res.send("ggggggggggggg");
// });

// const pokemonRouter = require("./routers/pokemonRouter");
// app.use("/pokemon", pokemonRouter);

// app.listen(port);

const express = require("express");
const app = express();
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

const port = 8080;

// route our app
app.get("/", async function (req, res) {
  const response = await P.getPokemonByName("eevee");
  res.send("hello world!" + response);
});

const userRouter = require("./routers/userRouter");
const pokemonRouter = require("./routers/pokemonRouter");
app.use("/pokemon", pokemonRouter);
app.use("/user", userRouter);

app.get("/type/:name", async function (req, res) {
  res.send(await P.getTypeByName(req.params.name));
});

// start the server
app.listen(port, function () {
  console.log(
    `app started listening on port ${port} visit us! http://localhost:8080`
  );
});
