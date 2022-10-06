import express from 'express';

export function checkAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('!!No autenticado');
  return res.status(401).json({ message: 'No estas autenticado' });
}

export function checkNotAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.isAuthenticated()) {
    console.log('!!Autenticado');
    return res.status(403).json({ message: 'Estas autenticado' });
  }
  return next();
}
