export interface Carros {
    id?: number;
    vin:string,
    marca:string,
    modelo:string,
    año:number,
    color:string,
    caracteristicas:string,
    detalles:string,
    precio_compra:number,
    estado_venta:string,
    estado_carro:string,
    fecha_compra: Date,
    fecha_venta: Date,
    fecha_registro: string,
    ultima_actualizacion:string,
    sucursal_id:number,
    status:boolean
  }