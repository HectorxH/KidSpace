import { Request } from 'express';

export interface IFavoritaRequest extends Request {
  body: {
    nunidad: Number,
    nactividad: Number,
    titulo: String
  }
}

export interface IPlanificadaRequest extends Request {
  body: {
    nunidad: Number,
    nactividad: Number,
    curso: String,
    fecha: Date
  }
}
