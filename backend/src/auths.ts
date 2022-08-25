import express from 'express';

export function checkAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}

export function checkNotAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.isAuthenticated()) {
    return res.sendStatus(401);
  }
  return next();
}
