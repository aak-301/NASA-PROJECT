const http = require('http');
require('dotenv').config();

const app = require('./app');
const { loadPlanetsata } = require('./models/planets.models');
const {mongoConnect} = require('./services/mongo');
const {loadLaunchData} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsata();
    await loadLaunchData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
