const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS = LOWERCASE_LETTERS.toUpperCase();

const ACTIONS = {
    ENCODE: 'encode',
    DECODE: 'decode',
};

const ALPHABETS = [ LOWERCASE_LETTERS, UPPERCASE_LETTERS ];

module.exports = {
    ALPHABETS,
    ACTIONS
}
