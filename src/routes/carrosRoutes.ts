import { Router } from "express";
import { createCar, deleteCar, getCars, updateCar } from "../controller/carrosController";
import { celebrate, Joi, Segments  } from "celebrate";

const router = Router();
/**
 * @route GET /api/carros
 * @desc Obtener todos los carros
 * @access private
*  @returns {array} 200 - informacion de los carros
 * @returns {string} 500 - Error interno del servidor
 */
router.get("/", getCars);

/**
 * @route PUT /api/carros/update/:id
 * @desc Actualizar carros por id
 * @access private
*  @returns {array} 200 - informacion de los carros
 * @returns {string} 500 - Error interno del servidor
 */
router.put("/update/:id", updateCar);

/**
 * @route PUT /api/carros/delete/:id
 * @desc eliminar carros por id
 * @access private
*  @returns {array} 200 - informacion de los carros
 * @returns {string} 500 - Error interno del servidor
 */
router.put("/delete/:id", deleteCar);

/**
 * @route POST /api/carros/
 * @desc eliminar carros por id
 * @access private
*  @returns {array} 200 - informacion de los carros
 * @returns {string} 500 - Error interno del servidor
 */
router.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object({
        vin: Joi.string().required(),
        marca: Joi.string().required(),
        modelo: Joi.string().required(),
        año: Joi.number().required(),
        color: Joi.string().required(),
        caracteristicas: Joi.string().required(),
        detalles: Joi.string().required(),
        precio_compra: Joi.number().required(),
        estado_venta: Joi.string().required(),
        estado_carro: Joi.string().required(),
        fecha_compra: Joi.date().required(),
        fecha_venta: Joi.date().required(),
        sucursal_id: Joi.number().required()
      })
    }),
    createCar
  );
export default router;
