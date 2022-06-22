import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActivity} from './activity';

export type desafioTipo = 'introductory' | 'interactive';
export type actividadNombre = 'diagramas';

export type RootStackParamList = {
  MainMap: undefined;
  Activity: {activity: IActivity};
  NoAvailableActivities: undefined;
  AvailableActivities: {activities: IActivity[]};
  CuentoInteractivo: {actividad: actividadNombre};
  CuentoIntroductorio: {actividad: actividadNombre};
  Desafio: {actividad: actividadNombre; tipo: desafioTipo};
  FinalQuiz: undefined;
  DynamicTable: undefined;
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
export type DesafioProps = NativeStackScreenProps<
  RootStackParamList,
  'Desafio'
>;
export type DynamicTableProps = NativeStackScreenProps<
  RootStackParamList,
  'DynamicTable'
>;
