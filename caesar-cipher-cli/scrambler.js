const stream = require('stream');
const { StringDecoder } = require('string_decoder');

const { ALPHABETS } = require('./constants');

class CaesarScrambler extends stream.Transform {
    constructor(shift) {
        super({ objectMode: false });
        this._decoder = new StringDecoder('utf-8');
        this._shift = shift;
    }

    _transform(chunk, enc, callback) {
        if (enc === 'buffer') {
            chunk = this._decoder.write(chunk)
        }
        const encryptedChunk = [...chunk].map((char) => this._encode(char)).join('');
        callback(null, encryptedChunk);
    }

    _encode(char) {
        const alphabet = this._getAlphabet(char);
        if (!alphabet) {
            return char;
        } else {
            const originalIndex = alphabet.indexOf(char);
            const encryptedIndex = this._getEncryptedIndex(originalIndex, alphabet.length);
            return alphabet[encryptedIndex];
        }
    }

    _getAlphabet(char) {
        return ALPHABETS.find((lettersSet) => lettersSet.includes(char));
    }

    _getEncryptedIndex(index, length) {
        return (
            index +
            // For shift bigger than alphabet size
            (this._shift % length) +
            // For negative shift
            length
        ) % length;
    }
}

module.exports = {
    CaesarScrambler,
};