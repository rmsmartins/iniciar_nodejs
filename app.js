const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());


let produtos = [];

fs.readFile("produtos.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else {
        produtos = JSON.parse(data);
    }
})

/**
 * POST => Inserir um dado
 * GET => Obter um/mais dados
 * PUT => Alterar um dado
 * DELETE => Apagar um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para a aplicação
 * Params => /produtos/132151654212 -> Parametro de rota, parametro obrigatório
 * Query => /produtos?id=4652313546545&value=456 -> Parametro de rota, parametro opcional
 */

app.post("/produtos", (request, response) => {
    //Nome e preço => name, price
    
    const { name, price } = request.body;

    const produto = {
        name,
        price,
        id: randomUUID(),
    }

    produtos.push(produto);

    ProductFile();

    return response.json(produto);
});


app.get("/produtos", (request, response) => {
    return response.json(produtos)
});


app.get("/produtos/:id", (request, response) => {
    const { id } = request.params;
    const produto = produtos.find(produto => produto.id === id);
    return response.json(produto);
})


app.put("/produtos/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const produtoIndex = produtos.findIndex(produto => produto.id === id);
    produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        name,
        price
    };

    ProductFile();

    return response.json({ message: "Produto alterado com sucesso"});
});


app.delete("/produtos/:id",  (request, response) => {
    const { id } = request.params;

    const produtoIndex = produtos.findIndex(produto => produto.id === id);
    
    produtos.splice(produtoIndex, 1);

    ProductFile()

    return response.json({message: "Produto removido com sucesso"});
})


function ProductFile() {
    fs.writeFile("produtos.json", JSON.stringify(produtos), (err) => {
        if(err) {
            console.log(err)
        }else {
            console.log("Produto inserido");
        }
        
    });
}

app.listen(4002, () => console.log("Servidor está a correr na porta 4002"));