// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email: userEmail } = req.body;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }
    console.log({
      userEmail,
    });
    const client = await MongoClient.connect(
      "mongodb://root:somepass@localhost:37019/events"
    );
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });
    client.close();
    return res.status(201).json({ message: "Signed up" });
  }
}
