import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IActividadLog, IActivity} from './activity';
import {ICarrera, IInfo} from './carrera';
import {IProfile} from './profile';

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
  | 'materiales'
  | 'diseño1'
  | 'diseño2'
  | 'nutricion1'
  | 'nutricion2'
  | 'informatica1'
  | 'informatica2'
  | 'debug';

export type RootStackParamList = {
  InicioView: undefined;
  ErrorView: undefined;
  CargaView: undefined;
  ProfileView: {Info: IProfile};
  EditCharacter: undefined;
  FormularioView: {data: IProfile};
  MainMap: undefined;
  Activity: {
    activity: IActivity;
    curso: string;
    userName: string;
    userLastName: string;
  };
  Carrera: {
    carrera: ICarrera;
    completadas: string;
    curso: string;
    userName: string;
    userLastName: string;
  };
  Story: {Info: IInfo; curso: string; userName: string; userLastName: string};
  NoAvailableActivities: undefined;
  AvailableActivities: {
    activities: IActivity[];
    curso: string;
    userName: string;
    userLastName: string;
  };
  CuentoInteractivo: {actividad: actividadNombre};
  CuentoIntroductorio: {actividad: actividadNombre};

  Actividades: {
    actividad: actividadNombre;
    cantMonedas: number;
    curso: string;
    userName: string;
    userLastName: string;
  };

  Conclusion: {actividad: actividadNombre; tipo: desafioTipo};
  ConclusionStory: undefined;
  FinalQuiz: undefined;
  ResultadoFinal: undefined;
  DynamicTable: undefined;
  Qr: undefined;
  Recompensas: {
    cantMonedas: number;
    nombreActividad: string;
    actLog: IActividadLog;
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
export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileView'
>;
export type EditCharacterProps = NativeStackScreenProps<
  RootStackParamList,
  'EditCharacter'
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
