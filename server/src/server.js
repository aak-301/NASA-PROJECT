const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsata } = require('./models/planets.models');

const PORT = process.env.PORT || 8000;

const mongoURL = "mongodb+srv://aakashshivanshu5:752qWQZRRA7tqcp0@nasa.cgxehw9.mongodb.net/?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.connection.on('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURL);
    await loadPlanetsata();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
