export interface Hamburguesa {
    id: number;
    nombre: string;
    descripcion:string;
    calorias: number;
    imagen: string;
  }

  export interface GetHamburguesaResponse{
    hamburguesas: Hamburguesa[];
    error: boolean
  }
  export interface PostHamburguesaResponse{
    error: boolean,
    mensaje: string
  }