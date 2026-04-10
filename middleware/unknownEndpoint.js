const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Endpoint desconhecido" });
};

module.exports = unknownEndpoint;