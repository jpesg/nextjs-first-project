import { MongoClient } from "mongodb";
export async function connectDb() {
  const client = await MongoClient.connect(
    "mongodb://root:somepass@localhost:37019/events"
  );
  return client;
}

export async function insertDocument(client, collection, doc) {
  const db = client.db();
  return await db.collection(collection).insertOne(doc);
}

export async function getAllDocuments({ client, collection, filter, sort }) {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
