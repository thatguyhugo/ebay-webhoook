module.exports = (req, res) => {
  if (req.method === "GET") return res.status(200).send("OK GET");
  if (req.method === "POST") return res.status(200).send("OK POST");
  return res.status(405).send("Method Not Allowed: " + req.method);
};
