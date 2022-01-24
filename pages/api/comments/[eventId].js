// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//api --> /comments/eventId
export default function handler(req, res) {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString,
      email,
      name,
      text,
    };

    return res
      .status(201)
      .json({ message: "added Comment", comment: newComment });
  }

  //get
  const dummyData = [
    {
      id: "c1",
      name: "C1",
      text: "c1",
    },
  ];
  res.status(200).json({ comments: dummyData });
}
