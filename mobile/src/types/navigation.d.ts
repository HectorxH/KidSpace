import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActivity} from './activity';

export type desafioTipo =
  | 'CuentoIntroductorio'
  | 'DesafioIntroductorio'
  | 'CuentoInteractivo'
  | 'DesafioCreativo'
  | 'introductory'
  | 'creative';
export type actividadNombre = 'diagramas' | 'diseños';

export type RootStackParamList = {
  MainMap: undefined;
  Activity: {activity: IActivity};
  NoAvailableActivities: undefined;
  AvailableActivities: {activities: IActivity[]};
  CuentoInteractivo: {actividad: actividadNombre};
  CuentoIntroductorio: {actividad: actividadNombre};

  Actividades: {actividad: actividadNombre; tipo: desafioTipo};
  Cuentos: {actividad: actividadNombre; tipo: desafioTipo};
  Desafios: {actividad: actividadNombre; tipo: desafioTipo};

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

export type ActividadesProps = NativeStackScreenProps<
  RootStackParamList,
  'Actividades'
>;
export type CuentosProps = NativeStackScreenProps<
  RootStackParamList,
  'Cuentos'
>;
export type DesafiosProps = NativeStackScreenProps<
  RootStackParamList,
  'Desafios'
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
export type ResultadoFinalProps = NativeStackScreenProps<
  RootStackParamList,
  'DynamicTable'
>;
