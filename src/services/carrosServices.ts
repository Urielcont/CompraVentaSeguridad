// src/services/carService.ts
import { conexionDB } from "../config/configDb";
import { Carros } from "../models/carros";
  
// Función para obtener todos los carros excepto los que tienen status=false
export const fetchAllCars = async (): Promise<Carros | null> => {
  try {
    const result = await conexionDB.query('SELECT * FROM carros WHERE status = true');
    return result.rows;
  } catch (err) {
    console.error('Error al obtener los carros', err);
    throw new Error('Error al obtener los carros');
  }
};

export const fetchUpdateCar = async (id: number, carro: Partial<Carros>): Promise<any> => {
  try {
    // Obtner el carro actual de la base de datos
    const currentCarResult = await conexionDB.query('SELECT * FROM carros WHERE id = $1', [id]);
    
    // Si el carro no existe, retornar null
    if (currentCarResult.rows.length === 0) {
      return null;
    }
    
    const currentCar = currentCarResult.rows[0];

    // Creamos un objeto con los valores actuales del carro, pero actualizamos solo los campos proporcionados
    const updatedCar = {
      vin: carro.vin || currentCar.vin,
      marca: carro.marca || currentCar.marca,
      modelo: carro.modelo || currentCar.modelo,
      año: carro.año || currentCar.año,
      color: carro.color || currentCar.color,
      caracteristicas: carro.caracteristicas || currentCar.caracteristicas,
      detalles: carro.detalles || currentCar.detalles,
      precio_compra: carro.precio_compra || currentCar.precio_compra,
      estado_venta: carro.estado_venta || currentCar.estado_venta,
      estado_carro: carro.estado_carro || currentCar.estado_carro,
      fecha_compra: carro.fecha_compra || currentCar.fecha_compra,
      fecha_venta: carro.fecha_venta || currentCar.fecha_venta,
      fecha_registro: carro.fecha_registro || currentCar.fecha_registro,
      ultima_actualizacion: carro.ultima_actualizacion || currentCar.ultima_actualizacion,
      sucursal_id: carro.sucursal_id || currentCar.sucursal_id,
    };

    // Ahora actualizamos solo los campos proporcionados
    const result = await conexionDB.query(
      'UPDATE carros SET vin = $1, marca = $2, modelo = $3, año = $4, color = $5, caracteristicas = $6, detalles = $7, precio_compra = $8, estado_venta = $9, estado_carro = $10, fecha_compra = $11, fecha_venta = $12, fecha_registro = $13, ultima_actualizacion = $14, sucursal_id = $15 WHERE id = $16 RETURNING *',
      [
        updatedCar.vin,
        updatedCar.marca,
        updatedCar.modelo,
        updatedCar.año,
        updatedCar.color,
        updatedCar.caracteristicas,
        updatedCar.detalles,
        updatedCar.precio_compra,
        updatedCar.estado_venta,
        updatedCar.estado_carro,
        updatedCar.fecha_compra,
        updatedCar.fecha_venta,
        updatedCar.fecha_registro,
        updatedCar.ultima_actualizacion,
        updatedCar.sucursal_id,
        id
      ]
    );

    return result.rows[0];  // Devolvemos el carro actualizado
  } catch (err) {
    console.error('Error al actualizar el carro', err);
    throw new Error('Error al actualizar el carro');
  }
};

// Eliminar Carro
export const fetchDeleteCar = async (id: number): Promise<boolean> => {
  try {
    // Actualizamos el estado del carro a false (eliminación lógica)
    const result = await conexionDB.query(
      'UPDATE carros SET status = $1 WHERE id = $2 RETURNING *',
      ['false', id]
    );
    
    if (result.rowCount === 0) {
      return false;  // Si no se encuentra el carro, devuelve false
    }

    return true;  // retorns true si la actualización fue exitosa
  } catch (err) {
    console.error('Error al eliminar el carro', err);
    throw new Error('Error al eliminar el carro');
  }
};


export const fetchCreateCar = async (car: Carros): Promise<Carros> => {
  try {
    const { vin, marca, modelo, año, color, caracteristicas, detalles, precio_compra, estado_venta, estado_carro, fecha_compra, fecha_venta, fecha_registro, ultima_actualizacion, sucursal_id } = car;
    
    // Inserta el carro en la base de datos
    const result = await conexionDB.query(
      `INSERT INTO carros (
        vin, marca, modelo, año, color, caracteristicas, detalles, 
        precio_compra, estado_venta, estado_carro, fecha_compra, fecha_venta, 
        fecha_registro, ultima_actualizacion, sucursal_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
      RETURNING *`,
      [
        vin, marca, modelo, año, color, caracteristicas, detalles, 
        precio_compra, estado_venta, estado_carro, fecha_compra, fecha_venta, 
        fecha_registro, ultima_actualizacion, sucursal_id
      ]
    );

    // Retorna el carro insertado
    return result.rows[0];
  } catch (err) {
    console.error('Error al crear el carro', err);
    throw new Error('Error al crear el carro');
  }
};