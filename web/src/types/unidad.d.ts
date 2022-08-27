import { IActividad } from './actividad';

export interface IUnidad {
  nunidad: number,
  img: string,
  path: string,
  title: string,
  description: string,
}

export interface IUnidadDetail {
  nunidad: number,
  unidad: string,
  titulo: string,
  descripcion: string,
  path: string,
  actividades: IActividad[]
}
