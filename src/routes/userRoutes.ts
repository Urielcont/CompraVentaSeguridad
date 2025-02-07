import { Router } from "express";
import { celebrate, Joi, Segments  } from "celebrate";
const router = Router();
import { signup, registrar, loginsinvalidar, login } from "../controller/userController";
// Definir rutas de autenticación
/**
 * @route POST /api/users/signup
 * @desc Registrar un nuevo usuario con seguridad
 * @access private
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} username - username de usuario
 * @returns {object} 201 - Usuario registrado exitosamente
 * @returns {object} 400 - Error en los datos proporcionados
 * @returns {object} 409 - El email ya está registrado
 */
router.post( "/signup",
  celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().min(1).max(50).required().messages({
        'string.base': '"username" debe ser un texto',
        'string.empty': '"username" no puede estar vacío',
        'string.min': '"username" debe tener al menos 3 caracteres',
        'string.max': '"username" no puede exceder los 50 caracteres',
        'any.required': '"username" es un campo obligatorio',
      }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.base': '"email" debe ser un texto',
          'string.email': '"email" debe tener un formato de correo electrónico válido',
          'string.empty': '"email" no puede estar vacío',
          'any.required': '"email" es un campo obligatorio',
        }),
        password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]*$'))
        .messages({
          'string.base': '"password" debe ser un texto',
          'string.min': '"password" debe tener al menos 8 caracteres',
          'string.max': '"password" no puede exceder los 32 caracteres',
          'string.pattern.base': '"password" solo puede contener letras, números y caracteres especiales permitidos',
          'any.required': '"password" es un campo obligatorio',
        }),
    }),
  }),
  signup
);


/**
 * @route POST /api/users/registrar
 * @desc Registrar un nuevo usuario sin nada de seguridad (correo no puede ser duplicado)
 * @access public
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} username - username de usuario
 * @returns {object} 201 - Usuario registrado exitosamente
 * @returns {object} 500 - Error al Agregar el usuario
*/
router.post( "/registrar",
  celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().min(1).max(50).required(),
      email: Joi.string().email().required(),
        password: Joi.string().min(8).max(32).required()
    }),
  }),
  registrar
);


/**
 * @route POST /api/users/loginsinvalidar
 * @desc Iniciar sesion sin validar
 * @access public
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {object} 201 - Login exitoso
 * @returns {object} 500 - Error al hacer login
*/
router.post(
  '/loginsinvalidar',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required()
    }),
  }),
  loginsinvalidar
);


/**
 * @route POST /api/users/login
 * @desc Iniciar sesion sin validar
 * @access private
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {object} 201 - Login exitoso
 * @returns {object} 404 - Usuario no encontrado
 * @returns {object} 401 - Contraseña incorrecta
 * @returns {object} 500 - Error al Agregar el usuario
*/
router.post(
  '/login', // Ruta para login
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.base': '"email" debe ser un texto',
          'string.email': '"email" debe tener un formato de correo electrónico válido',
          'string.empty': '"email" no puede estar vacío',
          'any.required': '"email" es un campo obligatorio',
        }),
      password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]*$'))
        .messages({
          'string.base': '"password" debe ser un texto',
          'string.min': '"password" debe tener al menos 8 caracteres',
          'string.max': '"password" no puede exceder los 32 caracteres',
          'string.pattern.base': '"password" solo puede contener letras, números y caracteres especiales permitidos',
          'any.required': '"password" es un campo obligatorio',
        }),
    }),
  }),
  login
);

router.get("/", (req, res) => {
  res.json({ message: "Usuarios funcionando" });
});

export default router;
