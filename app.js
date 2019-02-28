const Server = require('./server');

console.log('--- Planner Service ---');
console.log('Starting...');

process.on('uncaughtException', err => {
    console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection', err);
});

const port = process.env.PORT || 5000;
const server = new Server({ port });

server.start(() => {
    console.log(`Planner Service running on port ${port}`)
});