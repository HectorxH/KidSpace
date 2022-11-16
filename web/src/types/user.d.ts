export interface IUser {
  _id?: string,
  username?: string,
  password?: string,
  tipo: 'profesor' | 'representante' | 'apoderado' | 'estudiante'
  nombres: string,
  apellidos: string,
  email: string,
}
