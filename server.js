const express = require("express");
const port = 3000;

const server = express();
// creates an absolute path pointing to a folder called "views"
server.set("views", __dirname + "/views");
server.set("view engine", "hbs"); // here we are adding a view engine called hbs

server.get("/", (req, res) => {
    //res.sendFile(__dirname + "/index.html"); // here we don't need the DOT because we are in the middle of a path
    res.render("index"); // we don't need to add the extension html or hbs now because we have the engine
});

server.get("/about", (req,res)=>{
    res.render("about");
})

server.get("*",(req,res)=>{
    res.render("error");
})

server.listen(port, () => console.log(`SERVER running on port ${port}`));