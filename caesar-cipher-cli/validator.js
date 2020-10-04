const fs = require('fs');

const { ACTIONS } = require('./constants');

function validateAction(action) {
    if (action === ACTIONS.DECODE || action == ACTIONS.ENCODE) {
        return true;
    }
    console.error(`Action ${action} is not supported`);
    return false;
}

function validateShift(shift) {
    if (Number.isInteger(Number(shift))) {
        return true;
    }
    console.error(`Shift ${shift} is not an integer`);
    return false;
}

function doesFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        console.error(`File ${filePath} does not exists`);
        return false;
    }
}

function validateInput(filePath) {
    if (!filePath) {
        return true;
    }
    if (!doesFileExists(filePath)) {
        return false;
    }

    try {
        fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
        console.error(`Cannot read from ${filePath}`)
        return false;
    }

    return true;
}

function validateOutput(filePath) {
    if (!filePath) {
        return true;
    }
    if (!doesFileExists(filePath)) {
        return false;
    }

    try {
        fs.accessSync(filePath, fs.constants.W_OK);
    } catch (err) {
        console.error(`Cannot write to ${filePath}`)
        return false;
    }

    return true;
}


function validateArgs(args) {
    return validateAction(args.action)
        && validateShift(args.shift)
        && validateInput(args.input)
        && validateOutput(args.output);
}

module.exports = {
    validateArgs,
}