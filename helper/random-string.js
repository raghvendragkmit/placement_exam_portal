// Generate random strings.
const generateRandom = (length = 32, alphanumeric = true) => {
    let data = '';
    let keys = '';

    if (alphanumeric) {
        keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {
        keys = '0123456789';
    }

    for (let i = 0; i < length; i += 1) {
        data += keys.charAt(Math.floor(Math.random() * keys.length));
    }

    return data;
};

module.exports = { generateRandom };