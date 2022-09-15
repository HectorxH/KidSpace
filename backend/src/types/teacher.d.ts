import { Request } from 'express';

export interface IFavoritaRequest extends Request {
  body: {
    nunidad: number,
    nactividad: number,
    del?: boolean
  }
}

export interface IPlanificadaRequest extends Request {
  body: {
    _id: any,
    nunidad: number,
    nactividad: number,
    curso: string,
    fecha: Date,
    del?: boolean
  }
}
