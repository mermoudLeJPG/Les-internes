const readline = require("readline");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

/*
// Configurer readline pour lire les entrées de la console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Entrez une commande > '  // invite de commande
});
*/

//req = request
//res = respond
/*
app.get('/', (req, res) => {
    res.send('Hello World!');
});*/

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

// Afficher l'invite de commande
//rl.prompt();
/*
console.log("Press any key to continue . . . ");
rl.question("", () => {
    rl.close();
});*/