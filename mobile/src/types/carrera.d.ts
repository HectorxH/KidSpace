export interface ICarrera {
  id: Int16Array;
  img: string;
  title: string;
  desc: string;
  desc2: string;
  marginTop: Int16Array;
  marginLeft: Int16Array;
  stories: IInfo[];
}

export interface IInfo {
  carrera: string;
  img: string;
  title: string;
  desc: string;
  coins: Int16Array;
  estado: string;
}
