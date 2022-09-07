export interface IUser {
  username: string
  tipo: 'profesor' | 'representante' | 'apoderado' | 'estudiante'
  nombres: string,
  apellidos: string,
}
