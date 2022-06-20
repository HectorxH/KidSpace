import { IActividadDetail } from './actividad';
import { IUnidadDetail } from './unidad';

export interface IFavorita extends IActividadDetail {
  unidad: IUnidadDetail
}
