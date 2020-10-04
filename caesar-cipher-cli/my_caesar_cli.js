const program = require('commander');

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
    .requiredOption('-o, --output <string>', 'an output file path')
    .requiredOption('-a, --action <action>', 'an action encode/decode')
    .action(async ({ shift, input, output, action }) => {
        console.log(shift, input, output, action);
    });

program.parse(process.argv);