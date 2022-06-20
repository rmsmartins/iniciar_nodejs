const { response } = require("express");
const express = require("express")

const app = express();

app.get("/primeira-rota", (request, response) => {
    return response.json({
        message: "Acedeu à primeira rota com nodemon",
    });
});

app.listen(4002, () => console.log("Servidor está a correr na porta 4002"))