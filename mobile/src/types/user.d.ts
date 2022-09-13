export interface IUser {
  _id: string;
  nombres: string;
  apellidos: string;
  username: string;
  password: string;
  tipo: 'profesor' | 'representante' | 'apoderado' | 'estudiante';
}
