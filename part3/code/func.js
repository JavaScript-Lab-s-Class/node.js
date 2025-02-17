const {odd,even} = require('./var');

const checkOddOrEven = (num) => {
    return num %2 ?  odd : even;
}

module.exports = checkOddOrEven;