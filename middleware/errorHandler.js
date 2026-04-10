const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: "Valor duplicado" });
  }

  res.status(500).json({ error: "Erro interno do servidor" });
};

module.exports = errorHandler;