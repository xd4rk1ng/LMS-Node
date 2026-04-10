const app = require('./index');
const http = require('http');

const server = http.createServer(app);

const { PORT } = require('./config');

server.listen(PORT, () => {
    console.log(`O servidor esta a ser executado na porta ${PORT}`);
});
