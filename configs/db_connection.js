const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CON_URL);
        console.log('Database connection established.');
    } 
    catch (error) {
        console.log(`Database connection failed.`);
        process.exit(1);
    }
};


module.exports = connectDB;