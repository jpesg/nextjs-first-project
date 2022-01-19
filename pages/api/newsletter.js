// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email: userEmail } = req.body;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }
    console.log({
      userEmail,
    });
    return res.status(201).json({ message: "Signed up" });
  }
}
