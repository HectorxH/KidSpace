import { Request } from 'express';

export interface FavoritePostReq extends Request {
  body: {
    activity_id: number,
    favorite: boolean
  }
}
