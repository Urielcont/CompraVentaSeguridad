import { Router } from "express";

const router = Router();

// Definir rutas de autenticación
/**
 * @route POST /api/users/signup
 * @desc Registrar un nuevo usuario
 * @access Público
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} username - Nombre de usuario
 * @param {string} rol - Rol del usuario (opcional, por defecto "user")
 * @param {boolean} status - Estado del usuario (opcional, por defecto "true")
 * @returns {object} 201 - Usuario registrado exitosamente
 * @returns {object} 400 - Error en los datos proporcionados
 * @returns {object} 409 - El email ya está registrado
 */

export default router;
