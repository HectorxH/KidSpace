import { Request } from 'express';

export interface IFavoritePostRequest extends Request {
  body: {
    activity_id: number,
    favorite: boolean
  }
}
