const fs = require('fs');

const KEY = '121 212 121';
const SIN = '046 454 286';
const DEFAULT_AMOUNT_GENERATED = 10_000;

const isValidSIN = (sin, key) => {
    sin = sin.toString().replace(/ /g, '').split('');
    key = key.toString().replace(/ /g, '').split('');

    const newVals = sin.map((num, i) => (
        (parseInt(num) * parseInt(key[i]))) // Multiply SIN digit with corresponding Key digit
            .toString().split('') // Convert resulting sum from previous step to array of characters
            .map(x => parseInt(x)) // Convert array of characters to array of integers
            .reduce((sum, cur) => (sum + cur), 0) // Sum the corresponding integers together and return the sum
    );
    const sum = newVals.reduce((sum, curVal) => sum + curVal, 0);

    return sum % 10 === 0;
};

let validSins = [];
const iterations = process.argv[2] ? process.argv[2] : DEFAULT_AMOUNT_GENERATED
while (validSins.length < iterations) {
    let randomSIN = '';
    for (let i=0; i<9; i++){
        randomSIN += Math.floor(Math.random() * 10).toString();
        if (i % 3 === 2 && i !== 8) randomSIN += ' ';
    }
    if (isValidSIN(randomSIN, KEY)) validSins.push(randomSIN)
}

fs.writeFileSync('./output.csv', validSins.reduce((output, curVal) => output + '\n' + curVal), '');
