const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_URI)

let db

async function connectToDB() {
    try {
        await client.connect()
        db = client.db(process.env.DB_NAME)
        console.log('Connected to MongoDB')
    } catch(error) {
        console.error('Failed to connect to MongoDB:', error)
        process.exit(1)
    }
}

function getDB() {
    if (!db) {
        throw new Error('Do not have database: not initialized.')
    }
    
    return db
}

module.exports = { connectToDB, getDB }