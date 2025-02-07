import { Pool } from 'pg';

// Conexion a la base de datos de Postgres
const conexionDB = new  Pool ({ 
    user : process.env.USERPG , 
    password : process.env.PASSWORDPG, 
    host : process.env.HOSTPG, 
    port : process.env.PORTPG, 
    database: process.env.DATABASEPG
   }); 

// TEST DE CONEXION A LA BASE DE DATOS
const testConnection = async () => {
    try {
      await conexionDB.connect();
      console.log("Conexión a PostgreSQL exitosa");
    } catch (err) {
      console.error("Error al conectar a la base de datos", err);
      process.exit(1);
    }
  };
  
export { conexionDB, testConnection };
