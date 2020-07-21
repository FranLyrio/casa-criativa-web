const express = require('express');
const app = express();

const db = require("./db");

// Configurando arquivos estáticos (como CSS, scripts, imagens)
app.use(express.static("public"));

// Habilitar uso do request.body
app.use(express.urlencoded({ extended: true }));

// Configuração do nunjucks - o nunjucks permite que usemos variáveis no html
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: app,
    noCache: true // é bom desabilitar quando está desenvolvendo
});

app.get("/", (request, response) => {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)
        const reversedIdeas = [...rows].reverse() // chega aqui, pega 1, 2, 3, 4 (APENAS NESSA ORDEM)
        // aqui, pega-se todo o conteúdo da lista ideas, UMA ÚNICA VEZ
        let lastIdeas = []
        for (let idea of reversedIdeas) { // chega aqui, faz 4, 3, 2, 1
        // aqui, reverte-se a ordem, para que apareça de fato as últimas ideias. Como em reversedIdeas pega-se apenas uma vez a lista, o conteúdo não é revertido a cada vez que a páginca for atualizada.
            if(lastIdeas.length <2) {
                lastIdeas.push(idea)
            };
        };
        console.log(rows)
        return response.render("index.html", { ideas: lastIdeas })
    });
});

app.get("/ideias", (request, response) => {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        };
        const reversedIdeas = [...rows].reverse()
        return response.render("ideas.html", { ideas: reversedIdeas })
    });
});

app.post("/", (request, response) => {
    // Inserindo dados na tabela!
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?, ?, ?, ?, ?);
    `
    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link
    ];

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return response.send("Erro no banco de dados!")
        };
        return response.redirect("/ideias"); // Redirecionando para a página ideas depois que a ideia for cadastrada
    });
});

app.listen(3000);


