export default function handler(req, res) {
  if (req.method === "POST") {
    const VERIFY_TOKEN = process.env.VERIFICATION_TOKEN || "replace_with_your_token";

    if (req.body?.challenge && req.body?.verificationToken === VERIFY_TOKEN) {
      return res.status(200).json({ challenge: req.body.challenge });
    }

    console.log("eBay Webhook Event:", req.body);
    return res.status(200).send("Event received");
  }

  res.status(405).send("Method Not Allowed");
}
