const {odd,even} = require('./var');
const checkNumber = require('./func');

const checkStringOddEven = (str) => {
    return str.length %2 ? odd : even;
}

console.log(checkNumber(10));
console.log(checkStringOddEven('hello'));