// Express
const express = require('express');
const app = express();

// Conexão com o Banco de Dados
const connection = require('./database/db_connection');
connection.authenticate().then(() => {
    console.log('\n✅ Banco de dados conectado');
}).catch(error => {
    console.log(`\n❌ Erro ao conectar com o servidor: ${error}`);
});

// BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routers
const Router_lancamentos = require('./routers/Router_lancamentos');
app.use('/', Router_lancamentos);


// Inicia o servidor
const PORT = process.env.PORT || 3535;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor conectado na porta ${PORT}`);
});