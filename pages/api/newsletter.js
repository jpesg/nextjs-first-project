// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDb, insertDocument } from "../../helpers/db-utils";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email: userEmail } = req.body;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    let client;
    try {
      client = await connectDb();
    } catch (e) {
      return res.status(500).json({ message: "DB connection failed" });
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Inserting data failed" });
    }

    return res.status(201).json({ message: "Signed up" });
  }
}
