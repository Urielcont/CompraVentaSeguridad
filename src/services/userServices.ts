import { conexionDB } from "../config/configDb";

// Crear usuario segun los tipos de datos que esperamos recibir
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    rol: string;
    status: Boolean; 
  }
  
// Función para consultar si el usuario existe
export const fetchGetUserByEmail = async (email: string): Promise<User | null> => {
    const result = await conexionDB.query('SELECT * FROM users WHERE email = $1', [email]);  
    if (result.rows.length === 0) {
      return null;
    }
    // Retorna el primer usuario encontrado
    return result.rows[0] as User; 
  };

// Función para crear un nuevo usuario
export const fetchCreateUser = async (user): Promise<User | null> => {
    try {
      const { username, email, password, rol, status } = user;
      const result = await conexionDB.query(
        'INSERT INTO users (username, email, password, rol, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, password, rol, status]
      );
      return result.rows[0]; 
    } catch (err) {
      console.error('Error al crear el usuario', err);
      throw new Error('Error al crear el usuario');
    }
  };