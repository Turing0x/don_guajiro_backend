import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

const client = new MongoClient(process.env.MONGO_URL!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function dbConnection() {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL!)
    console.clear()
    console.log('Base de datos Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error en la base de datos')
  }
}

export async function db() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

db().catch(console.dir);