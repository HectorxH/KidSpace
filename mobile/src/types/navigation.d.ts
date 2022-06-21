import {IMessage} from './message';

export type RootStackParamList = {
  MainMap: undefined;
  Activity: {};
  NoAvailableActivities: undefined;
  AvailableActivities: {message: IMessage[]};
  CuentoInteractivo: {};
  CuentoIntroductorio: {};
  Desafio: {};
};
