const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

console.log('A ligar ao MongoDB...');

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Ligação ao MongoDB estabelicida com sucesso!');
    })
    .catch((error) => {
        console.log('Erro ao ligar à base de dados MongoDB:', error.message);
    });

module.exports = mongoose;