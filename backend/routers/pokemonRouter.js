// "use strict";
// const express = require("express");
// const router = express.Router();

// const Pokedex = require("pokedex-promise-v2");
// const P = new Pokedex();

// router.get("/", (req, res) => {
//   res.send("pokemon GO!");
// });
// // get query pokemon response
// router.get("/:name", (req, res) => {
//   P.getPokemonByName(req.params.name)
//     .then(function (response) {
//       res.json({
//         name: response.name,
//         height: response.height,
//         weight: response.weight,
//         types: response.types,
//         front_pic: response.front_pic,
//         back_pic: response.back_pic,
//         abilities: response.abilities,
//       });
//     })
//     .catch(function (error) {
//       res.json({ Error: "There was an ERROR" });
//     });
// });

// // get response id
// router.get("/get/:id", (req, res) => {
//   res.send(`hello ${req.params.id}`);
// });

// module.exports = router;

const router = require("express").Router();
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

router.get("/get/:id", async (req, res) => {
  res.send(await getPokemon(req.params.id));
});

router.get("/get/:id", async (req, res) => {
  try {
    res.send(await getPokemon(req.params.id));
  } catch {
    res.status(404).send("");
  }
});
router.get("/query", async (req, res) => {
  try {
    res.send(await getPokemon(req.query.id));
  } catch {
    res.status(404).send("");
  }
});

router.get("/query", async (req, res) => {
  res.send(await getPokemon(req.query.name));
});

async function getPokemon(id) {
  const pokeObj = await P.getPokemonByName(id);
  return {
    name: pokeObj.name,
    height: pokeObj.height,
    weight: pokeObj.weight,
    types: pokeObj.types,
    front_pic: pokeObj.sprites.front_default,
    back_pic: pokeObj.sprites.back_default,
    abilities: pokeObj.moves,
  };
}

module.exports = router;
