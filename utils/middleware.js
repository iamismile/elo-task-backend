const unknownEndpoint = (req, res) => {
  res
    .status(404)
    .json({ error: `Cannot find '${req.originalUrl}' on this server.` });
};

module.exports = {
  unknownEndpoint,
};
