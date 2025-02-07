import { Request, Response } from "express";
import { fetchAllCars,fetchCreateCar,fetchDeleteCar,fetchUpdateCar } from "../services/carrosServices";
import { Carros } from "../models/carros";


// Controlador para obtener todos los carros
export const getCars = async (req: Request, res: Response): Promise<void> => {
    try {
      const cars = await fetchAllCars();
      res.status(200).json({ cars });
    } catch (error) {
      console.error('Error al obtener los carros', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  };

  export const updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;  // ID del carro a actualizar
      const carro: Carros = req.body;  // Obtenemos los datos del carro desde el cuerpo de la solicitud
      // Validamos que el carro exista con el ID
      const updatedCar = await fetchUpdateCar(Number(id), carro);
      
      if (!updatedCar) {
        res.status(404).json({ message: "Carro no encontrado" });
        return;
      }
  
      res.status(200).json({ message: "Carro actualizado con éxito", carro: updatedCar });
      console.log("Carro actualizado con éxito")
    } catch (error) {
      console.error("Error al actualizar el carro:", error);
      res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };

  // Eliminar carro
  export const deleteCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;  // ID del carro a eliminar
  
      // Llamamos al servicio de eliminación lógica
      const deleted = await fetchDeleteCar(Number(id));
  
      if (!deleted) {
        res.status(404).json({ message: "Carro no encontrado" });
        return;
      }
  
      res.status(200).json({ message: "Carro eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
      res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };


  export const createCar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vin, marca, modelo, año, color, caracteristicas, detalles, precio_compra, estado_venta, estado_carro, fecha_compra, fecha_venta, sucursal_id } = req.body;
  
      // Validar que todos los campos necesarios estén presentes
      if (!vin || !marca || !modelo || !año || !color || !caracteristicas || !detalles || !precio_compra || !estado_venta || !estado_carro || !fecha_compra || !fecha_venta || !sucursal_id) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
      }
  
      const fecha_registro = new Date();  // Fecha actual
      const ultima_actualizacion = new Date();  // Fecha actual
  
      // Crear el objeto del carro, incluyendo las fechas en formato adecuado
      const newCar: Omit<Carros, 'id'> = {
        vin, marca, modelo, año, color, caracteristicas, detalles, precio_compra, 
        estado_venta, estado_carro, fecha_compra, fecha_venta, 
        fecha_registro: fecha_registro.toISOString(), 
        ultima_actualizacion: ultima_actualizacion.toISOString(),
        sucursal_id, status: true
      };
  
      // Llamamos al servicio para crear el carro
      const createdCar = await fetchCreateCar(newCar);
  
      // Enviamos la respuesta
      res.status(201).json({ message: "Carro creado con éxito", car: createdCar });
    } catch (error) {
      console.error("Error al crear el carro:", error);
      res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };
  