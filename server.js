const express = require("express");
const port = 3000;

const server = express();
// creates an absolute path pointing to a folder called "views"
server.set("views", __dirname + "/views");
server.set("view engine", "hbs"); // here we are adding a view engine called hbs

async function getPokemons() {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const jsonData = await data.json();
    const { results } = jsonData;
    return results;
}

server.get(["/", "/index"], async (req, res) => { // we can add an array to use multiple routes for the same thing
    //res.sendFile(__dirname + "/index.html"); // here we don't need the DOT because we are in the middle of a path
    const pokemonArray = await getPokemons();
    console.log(pokemonArray);
    const data = {
        name: "Clara",
        role: "Boomer",
        bootcamp: "",
        favouriteFood: pokemonArray,
        isPaid: false
    }
    /* 
    BACKLOG:
        const moreData = {
            name: "Marc",
            role: "Tiger",
            bootcamp: "Web dev"
        } 
    */

    res.render("index", data); // we don't need to add the extension html or hbs now because we have the engine
});

server.get("/about", (req, res) => {
    res.render("about");
});

server.get("/contacts", (req, res) => {
    res.render("contacts");
});

server.get("*", (req, res) => {
    res.render("error");
});

server.listen(port, () => console.log(`SERVER running on port ${port}`));