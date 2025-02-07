import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { fetchCreateUser, fetchGetUserByEmail } from "../services/userServices";

// Controlador para registrar un nuevo usuario
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!username || !email || !password) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    // Verificar si el usuario existe por el correo
    const userExists = await fetchGetUserByEmail(email);
    if (userExists) {
      res.status(409).json({ message: "Este email ya existe" });
      return;
    }

    // Validar la contraseña (mínimo 8 caracteres, al menos un número y una letra)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres, con al menos una letra y un número.",
      });
      return;
    }

    // Encriptar la contraseñ
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await fetchCreateUser({
      username,
      email,
      password: hashedPassword,
      rol: "user", //Valor por defecto al ser agregado desde la app
      status: true, // Valor por defecto de estado de usuario
    });

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error("Error al registrar el usuario: ", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};


// Controlador para registrar un nuevo usuario sin nada de seguridad
export const registrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;

      // Crear el usuario
      const newUser = await fetchCreateUser({
        username,
        email,
        password,
        rol: "ninguno", //Valor por defecto al ser agregado desde la app
        status: true, // Valor por defecto de estado de usuario
      });
  
      res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
      console.error("Error al registrar el usuario: ", error);
      res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };

// Funcion para iniciar sesion sin validaciones
  export const loginsinvalidar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Verificar que los campos no estén vacíos
      if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        return;
      }
  
      // Verificar si el usuario existe
      const user = await fetchGetUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
      console.error('Error al hacer login: ', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  };


  // Controlador para login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Verificar que los campos no estén vacíos
      if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        return;
      }
  
      // Verificar si el usuario existe
      const user = await fetchGetUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
  
      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Contraseña incorrecta' });
        return;
      }
  
      // Aquí normalmente generarías un JWT o algo similar, pero por ahora solo regresamos una respuesta de éxito
      res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
      console.error('Error al hacer login: ', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  };