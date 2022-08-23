import { Request } from 'express';

export interface IFavoritaPostRequest extends Request {
  body: {
    nunidad: Number,
    nactividad: Number,
    titulo: String,
    favorita: boolean
  }
}
