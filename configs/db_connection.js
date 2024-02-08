const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let DB_URL = process.env.NODE_ENV !== 'test' ? process.env.DATABASE_CON_URL : process.env.TEST_DB
        console.log(`connection url: ${DB_URL}`);
        
        await mongoose.connect(DB_URL);
        console.log('Database connection established.');
    } 
    catch (error) {
        console.log(`Database connection failed.`);
        process.exit(1);
    }
};


module.exports = connectDB;