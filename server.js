const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const addPlanRoutes = require('./routes/plan');

class Server {
    constructor({ port }) {
        if (!port) {
            throw new Error('Server must be given port in initializer');
        }

        this.port = port;
    }

    start(done) {
        const app = express();
        app.use(morgan('combined'));
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }));

        addPlanRoutes(app);

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });

        app.listen(this.port, () => {
            done();
        });
    }
}

module.exports = Server;