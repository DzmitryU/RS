const program = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

const { CaesarScrambler } = require('./scrambler');
const { ACTIONS } = require('./constants');
const { validateArgs } = require('./validator');

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
        const source = input ? fs.createReadStream(input) : process.stdin;
        const target = output ? fs.createWriteStream(output, { flags: 'a' }) : process.stdout;
        await promisify(pipeline)(
            source,
            new CaesarScrambler(action === ACTIONS.ENCODE ? shift : -shift),
            target,
        );
    });

program.parse(process.argv);