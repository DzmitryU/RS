const program = require('commander');
const fs = require('fs');

const { CaesarScrambler } = require('./scrambler');

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
    .requiredOption('-i, --input <string>', 'an input file path')
    .option('-o, --output <string>', 'an output file path')
    .option('-a, --action <action>', 'an action encode/decode')
    .action(async ({ shift, input, output, action }) => {
        const inputFile = fs.createReadStream(input);
        const outputFile = fs.createWriteStream(output);
        inputFile.pipe(new CaesarScrambler(shift)).pipe(outputFile);
    });

program.parse(process.argv);