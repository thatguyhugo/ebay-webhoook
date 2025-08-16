const crypto = require("crypto");

const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
const ENDPOINT_URL = process.env.ENDPOINT_URL; // must match exactly what you put in eBay

module.exports = async (req, res) => {
  // eBay first calls GET ?challenge_code=...
  if (req.method === "GET") {
    const challengeCode = req.query.challenge_code || req.query.challengeCode;
    if (challengeCode) {
      const h = crypto.createHash("sha256");
      h.update(challengeCode);
      h.update(VERIFICATION_TOKEN);
      h.update(ENDPOINT_URL);
      const challengeResponse = h.digest("hex");
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(JSON.stringify({ challengeResponse }));
    }
    return res.status(200).send("OK");
  }

  // After validation eBay will POST here
  if (req.method === "POST") {
    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
};
