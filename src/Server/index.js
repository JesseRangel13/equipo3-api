import express from 'express';
import {join,dirname} from 'path';
import { fileURLToPath } from 'url';
import hamburguesasRoutes from "./routes/hamburguesas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const angularAppPath = join(__dirname, '..', '..', 'dist', 'equipo3-api', 'browser');
app.use(express.static(angularAppPath));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(hamburguesasRoutes);
app.use(usuariosRoutes);

app.get('*', function(req, res) {
  res.sendFile(path.join(angularAppPath, 'index.html')); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
