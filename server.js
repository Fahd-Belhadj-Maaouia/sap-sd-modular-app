const cds = require('@sap/cds');
const cors = require('cors');

cds.on('bootstrap', (app) => {
    app.use(cors({
        origin: '*', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }));
});

module.exports = cds.server;