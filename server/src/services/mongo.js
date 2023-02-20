
const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://aakashshivanshu5:752qWQZRRA7tqcp0@nasa.cgxehw9.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.on('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect(){
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {mongoConnect,mongoDisconnect};