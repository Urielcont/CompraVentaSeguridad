import dotenvSafe from "dotenv-safe";

// Cargar configuracion de dotenv-safe
const loadEnv = () => {
  dotenvSafe.config({
    allowEmptyValues: true,
  });
};

export { loadEnv };
