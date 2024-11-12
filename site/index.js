const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Press any key to continue . . . ");
rl.question("", () => {
    rl.close();
});