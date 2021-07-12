const { response } = require("express");
const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

// -- Define your route listeners here! --

app.get("/pokemon", (request, response) => {
  return response.send(allPokemon);
});

app.get("/pokemon/search", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);

  for (let key in queryParams) {
    const foundPokemon = allPokemon.find((pokemonElement) => {
      return pokemonElement[key]
        .toLowerCase()
        .includes(queryParams[key].toLowerCase());
    });

    if (foundPokemon) {
      return res.json(foundPokemon);
    } else {
      return res.json({ msg: "Pokemon not found!" });
    }
  }

  res.json(queryParams);
});

app.get("/pokemon/:id", (request, response) => {
  const id = request.params.id;

  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id === Number(id);
  });

  return response.json(foundPokemon);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
