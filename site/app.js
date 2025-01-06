const readline = require("readline");
const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");

const pack = require("./package.json");

const app = express();
const port = 3000;
const host = "10.40.15.230";

// Configurer readline pour lire les entrées de la console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Entrez une commande > '  // invite de commande
});

//req = request
//res = respond
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

app.use(express.static(path.join(__dirname, 'public')));
let server;
if (pack.https) {
    // Load the generated SSL certificate and key
    const sslOptions = {
        key: fs.readFileSync(path.join(__dirname, 'public', 'cert', 'localhost-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'public', 'cert', 'localhost.pem'))
    };
    //Create HTTPS server
    server = https.createServer(sslOptions, app);

    server.listen(port, host, () => {
        console.log(`HTTPS Server running on https://${host}:${port}`);
    });
} else {
    // Create HTTP server
    server = http.createServer(app);

    server.listen(port, host, () => {
        console.log(`HTTP Server running on http://${host}:${port}`);
    });
}
//errHandler
process.on("unhandledRejection", (err) => {
    server.close();
});

// Afficher l'invite de commande
rl.prompt();

console.log("Press any key to continue . . . ");
rl.question("", () => {
    server.close();
    rl.close();
});