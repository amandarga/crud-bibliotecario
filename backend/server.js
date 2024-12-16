const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());


app.post("/cdd", (req, res) => {
  const { codigo, descricao, area } = req.body;
  db.query(
    "INSERT INTO cdd (codigo, descricao, area) VALUES (?, ?, ?)",
    [codigo, descricao, area],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ id: result.insertId, message: "Registro criado!" });
    }
  );
});

app.get("/cdd", (req, res) => {
  db.query("SELECT * FROM cdd", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put("/cdd/:id", (req, res) => {
  const { codigo, descricao, area } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE cdd SET codigo = ?, descricao = ?, area = ? WHERE id = ?",
    [codigo, descricao, area, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Registro atualizado!" });
    }
  );
});

app.delete("/cdd/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cdd WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Registro deletado!" });
  });
});

// Iniciar servidor
const PORT = 3306;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
