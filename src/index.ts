import { loadEnv } from "./config/env";
loadEnv()
import express from "express";
import userRouter from "./routes/userRoutes"
import carroRouter from "./routes/carrosRoutes";
import { testConnection } from "./config/configDb";
// import morgan from "morgan";
import cors from 'cors';
// const db = require("../src/config/configDB.js"); // Importa la configuración de la base de datos

// servidor de express
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    credentials: true, // Permite cookies y tokens en las solicitudes
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  })
);

// Middleware del servidor
app.use(express.json());

// Rutas
app.use("/api/users", userRouter);
app.use("/api/carros", carroRouter);
// PRUEBA
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});



// Funcion para inicar el servidor en el puerto establecido
const startServerExpress = async () => {
  await testConnection();
  try {
    app.listen(process.env.PORT, () => {
      console.log("Servidor listo en el puerto: ",process.env.PORT);
    });

  } catch (error) {
    console.error("Error al conectar el servidor", error);
    process.exit(1); //Terminar el proceso
  }
};

//Iniciar el servidor y configuraciones iniciales
startServerExpress();

