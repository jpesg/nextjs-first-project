// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//api --> /comments/eventId]

import {
  connectDb,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-utils";
export default async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await connectDb();

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

    await insertDocument(client, "comments", newComment);
    client.close();
    return res
      .status(201)
      .json({ message: "added Comment", comment: newComment });
  }

  //get
  try {
    const comments = await getAllDocuments({
      client,
      collection: "comments",
      filter: { eventId },
      sort: { _id: -1 },
    }).map((c) => ({ ...c, id: c._id }));
    res.status(200).json({ comments });
  } catch (e) {
    res.status(500).json({ message: "Error getting comments" });
  }

  client.close();
}
