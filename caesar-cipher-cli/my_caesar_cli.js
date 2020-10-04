const program = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

const { CaesarScrambler } = require('./scrambler');
const { ACTIONS } = require('./constants');
const { validateArgs } = require('./validator');

/**
 .requiredOption('-s, --shift <n>', 'shift')
 .requiredOption('-i, --input <s>', 'an input file path')
 .requiredOption('-o, --output <s>', 'an output file path')
 .requiredOption('-a, --action <s>', 'an action encode/decode')
 */

program
    .storeOptionsAsProperties(true)
    .passCommandToAction(false);

program
    .description('Encodes and decodes a text by Caesar cipher')
    .requiredOption('-s, --shift <number>', 'shift')
    .option('-i, --input <string>', 'an input file path')
    .option('-o, --output <string>', 'an output file path')
    .option('-a, --action <action>', 'an action encode/decode')
    .action(async (args) => {
        if(!validateArgs(args)) {
            process.exit(9);
        }
        const { shift, input, output, action } = args;
        const inputFile = fs.createReadStream(input);
        const outputFile = fs.createWriteStream(output, { flags: 'a' });
        await promisify(pipeline)(
            inputFile,
            new CaesarScrambler(action === ACTIONS.ENCODE ? shift : -shift),
            outputFile,
        );
    });

program.parse(process.argv);