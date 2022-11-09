const paq1 : string = require('../assets/ok.png');
const paq2 : string = require('../assets/highfive.png');
const paq3 : string = require('../assets/rock.png');

export default [
  {
    id: 0,
    img: paq1,
    title: 'BASIC',
    price: '$ 17.990 / 6 Meses',
    color: '#F2C144',
    cantidad: 'Hasta 2 profesores',
  },
  {
    id: 1,
    img: paq2,
    title: 'PRO',
    price: '$ 29.990 / 6 Meses',
    color: '#5c9dec',
    cantidad: 'Hasta 5 profesores',
  },
  {
    id: 2,
    img: paq3,
    title: 'PRO+',
    price: '$ 34.990 / 6 Meses',
    color: '#FF8A00',
    cantidad: 'Más de 5 profesores',
  },
];
