import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActivity} from './activity';
import {ICarrera, IInfo} from './carrera';

export type desafioTipo =
  | 'CuentoIntroductorio'
  | 'DesafioIntroductorio'
  | 'CuentoInteractivo'
  | 'DesafioCreativo'
  | 'introductory'
  | 'creative';
export type actividadNombre =
  | 'diagramas'
  | 'diseños'
  | 'diseño1'
  | 'diseño2'
  | 'nutricion1'
  | 'nutricion2'
  | 'debug';

export type RootStackParamList = {
  InicioView: undefined;
  ErrorView: undefined;
  CargaView: undefined;
  FormularioView: {event: any};
  MainMap: undefined;
  Activity: {activity: IActivity};
  Carrera: {carrera: ICarrera; completadas: string};
  Story: {Info: IInfo};
  NoAvailableActivities: undefined;
  AvailableActivities: {activities: IActivity[]};
  CuentoInteractivo: {actividad: actividadNombre};
  CuentoIntroductorio: {actividad: actividadNombre};

  Actividades: {actividad: actividadNombre; cantMonedas: number};

  Conclusion: {actividad: actividadNombre; tipo: desafioTipo};
  ConclusionStory: undefined;
  FinalQuiz: undefined;
  ResultadoFinal: undefined;
  DynamicTable: undefined;
  Qr: undefined;
  Recompensas: {cantMonedas: number; nombreActividad: string};
  Tienda: {
    setCantMonedas: React.Dispatch<React.SetStateAction<number>>;
    cantMonedas: number;
  };
  Ropa: undefined;
  Accesorios: undefined;
  TiendaItems: {
    tipo: string;
    setCantMonedas: React.Dispatch<React.SetStateAction<number>>;
    cantMonedas: number;
  };
};

export type InicioViewProps = NativeStackScreenProps<
  RootStackParamList,
  'InicioView'
>;
export type FormularioViewProps = NativeStackScreenProps<
  RootStackParamList,
  'FormularioView'
>;
export type ErrorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'ErrorView'
>;
export type CargaViewProps = NativeStackScreenProps<
  RootStackParamList,
  'CargaView'
>;
export type MainMapProps = NativeStackScreenProps<
  RootStackParamList,
  'MainMap'
>;
export type ActivityProps = NativeStackScreenProps<
  RootStackParamList,
  'Activity'
>;
export type CarreraProps = NativeStackScreenProps<
  RootStackParamList,
  'Carrera'
>;
export type InfoProps = NativeStackScreenProps<RootStackParamList, 'Story'>;
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

export type DynamicTableProps = NativeStackScreenProps<
  RootStackParamList,
  'DynamicTable'
>;
type ConclusionProps = NativeStackScreenProps<RootStackParamList, 'Conclusion'>;
export type ConclusionStoryProps = NativeStackScreenProps<
  RootStackParamList,
  'ConclusionStory'
>;
export type RecompensasProps = NativeStackScreenProps<
  RootStackParamList,
  'Recompensas'
>;
export type TiendaProps = NativeStackScreenProps<RootStackParamList, 'Tienda'>;

export type RopaProps = NativeStackScreenProps<RootStackParamList, 'Ropa'>;
export type AccesoriosProps = NativeStackScreenProps<
  RootStackParamList,
  'Accesorios'
>;
export type TiendaItemsProps = NativeStackScreenProps<
  RootStackParamList,
  'TiendaItems'
>;
