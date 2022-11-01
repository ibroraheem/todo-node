
const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect('mongodb+srv://OgihJonathan:Ogih8391@cluster0.v1fmvyo.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("mongoDb connected");
};
module.exports = connectDb;

