export interface Usuario {
    id: number;
    nombre: string;
    apellidos:string;
    direccion: string;
    telefono: number;
    correo: string;
  }

  export interface GetUsuarioResponse{
    usuarios: Usuario[];
    error: boolean
  }
  export interface PostUsuarioResponse{
    error: boolean,
    mensaje: string
  }