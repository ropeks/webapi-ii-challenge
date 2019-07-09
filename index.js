const express = require('express');
const hubsRoutes = require('./hubs-routes');

const server = express();
const port = 3000;

server.use(express.json());

server.use('/api/posts', hubsRoutes);

server.get('/', (req, res) => {
    res.send('<h1>This is blogpost API</h1>');
});

server.listen(port, () => {
    console.log(`\n server running on port ${port} \n`);
});