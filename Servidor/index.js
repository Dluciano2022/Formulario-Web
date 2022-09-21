const express = require  ('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require ('cors');

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send ("Servidor en linea");
});

app.post("/upload", (req, res) => {
    console.log(req.files.file);
    res.send(`Archivo ${req.files.file.name} cargado de forma correcta en server`);

    fileUpload.mv()
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});