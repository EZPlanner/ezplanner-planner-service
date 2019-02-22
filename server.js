const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

class Server {
    constructor({ port }) {
        if (!port) {
            throw new Error('Server must be given port in initializer');
        }

        this.port = port;
        this.server = null;
    }

    async start(done) {
        const app = express();
        app.use(morgan());
        app.use(helmet());
        app.use((err, req, res, next) => {
            throw new Error(`Something went wrong!, error: ${err}`);
            res.status(500).send('Something went wrong!');
        });

        this.server = app.listen(this.port, () => {
            done();
        });
    }
}

module.exports = Server;