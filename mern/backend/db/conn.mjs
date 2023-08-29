import { MongoClient } from 'mongodb';

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let database = null;
const connectToDB = async () => {
  if (database) { return database };
  try {
    await client.connect();
    database = client.db("hos08");
    return database;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

export default connectToDB;

const closeConnection = async () => {
    if (client.isConnected()) {
        await client.close();
    }
};

export { closeConnection };
