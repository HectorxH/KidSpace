import {ActividadesCompletadas} from './activity';
import {actividadNombre} from './navigation';

export interface ICarrera {
  id: Int16Array;
  completadas: ActividadesCompletadas;
  img: string;
  title: string;
  desc: string;
  desc2: string;
  marginTop: Int16Array;
  marginLeft: Int16Array;
  stories: IInfo[];
}

export interface IInfo {
  carrera: string;
  actividad: actividadNombre;
  nombre: string;
  img: string;
  title: string;
  desc: string;
  coins: number;
  estado: string;
}

export interface ICarreraNombre {
  carrera: string;
  nombre1: string;
  nombre2: string;
}
