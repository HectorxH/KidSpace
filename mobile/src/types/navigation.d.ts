import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActivity} from './message';

export type RootStackParamList = {
  MainMap: undefined;
  Activity: {activity: IActivity};
  NoAvailableActivities: undefined;
  AvailableActivities: {activities: IActivity[]};
  CuentoInteractivo: {actividad: 'diagramas'};
  CuentoIntroductorio: {actividad: 'diagramas'};
  Desafio: {};
  FinalQuiz: {};
};

export type MainMapProps = NativeStackScreenProps<
  RootStackParamList,
  'MainMap'
>;
export type ActivityProps = NativeStackScreenProps<
  RootStackParamList,
  'Activity'
>;
export type NoAvailableActivitiesProps = NativeStackScreenProps<
  RootStackParamList,
  'NoAvailableActivities'
>;
export type AvailableActivitiesProps = NativeStackScreenProps<
  RootStackParamList,
  'AvailableActivities'
>;
export type CuentoInteractivoProps = NativeStackScreenProps<
  RootStackParamList,
  'CuentoInteractivo'
>;
export type CuentoIntroductorioProps = NativeStackScreenProps<
  RootStackParamList,
  'CuentoIntroductorio'
>;
export type FinalQuizProps = NativeStackScreenProps<
  RootStackParamList,
  'FinalQuiz'
>;
export type Desafio = NativeStackScreenProps<RootStackParamList, 'Desafio'>;
