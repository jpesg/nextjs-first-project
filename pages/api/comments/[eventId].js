// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//api --> /comments/eventId]
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb://root:somepass@localhost:37019/events"
  );
  const db = client.db();

  if (req.method === "POST") {
    //add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    await db.collection("comments").insertOne(newComment);
    client.close();
    return res
      .status(201)
      .json({ message: "added Comment", comment: newComment });
  }

  //get
  const comments = await db
    .collection("commnets")
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray()
    .map((c) => ({ ...c, id: c._id }));
  client.close();
  res.status(200).json({ comments });
}
