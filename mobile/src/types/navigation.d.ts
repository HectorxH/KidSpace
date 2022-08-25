import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActivity} from './activity';

export type desafioTipo = 'introductory' | 'interactive';
export type actividadNombre = 'diagramas' | 'diseños';

export type RootStackParamList = {
  MainMap: undefined;
  Activity: {activity: IActivity};
  NoAvailableActivities: undefined;
  AvailableActivities: {activities: IActivity[]};
  Cuentos: {actividad: actividadNombre; tipo: desafioTipo};
  CuentoInteractivo: {actividad: actividadNombre};
  CuentoIntroductorio: {actividad: actividadNombre};
  Desafio: {actividad: actividadNombre; tipo: desafioTipo};
  Conclusion: {actividad: actividadNombre; tipo: desafioTipo};
  ConclusionStory: undefined;
  FinalQuiz: undefined;
  ResultadoFinal: undefined;
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
type ConclusionProps = NativeStackScreenProps<RootStackParamList, 'Conclusion'>;
export type ConclusionStoryProps = NativeStackScreenProps<
  RootStackParamList,
  'ConclusionStory'
>;
export type CuentosProps = NativeStackScreenProps<
  RootStackParamList,
  'Cuentos'
>;

export type ResultadoFinalProps = NativeStackScreenProps<
  RootStackParamList,
  'DynamicTable'
>;
