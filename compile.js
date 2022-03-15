const path = require('path');
const fs = require('fs');
const solc = require('solc');

const CONTRACT_FILENAME='Lottery.sol';

const lotteryPath = path.resolve(__dirname, 'contracts', CONTRACT_FILENAME);
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        [CONTRACT_FILENAME]: {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[CONTRACT_FILENAME].Lottery;
