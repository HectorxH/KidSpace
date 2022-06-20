import { IActividad } from './actividad';

export interface IUnidad {
  nunidad: string,
  img: string,
  path: string,
  title: string,
  description: string,
}

export interface IUnidadDetail {
  nunidad: string,
  unidad: string,
  titulo: string,
  descripcion: string,
  path: string,
  actividades: IActividad[]
}
