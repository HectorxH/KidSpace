const paq1 : string = require('../assets/ok.png');
const paq2 : string = require('../assets/highfive.png');
const paq3 : string = require('../assets/rock.png');
const paq0 : string = require('../assets/pipo_triste.png');

export default [
  {
    id: 0,
    img: paq1,
    title: 'BASIC',
    price: '$ 59.990 / 6 Meses',
    color: '#F2C144',
    cantidad: 'Hasta 2 profesores',
    url: 'https://sandbox.flow.cl/btn.php?token=a3nch0z',
    // url: 'https://www.flow.cl/btn.php?token=eoksudx',
    limite: 2,
  },
  {
    id: 1,
    img: paq2,
    title: 'PRO',
    price: '$ 99.990 / 6 Meses',
    color: '#5c9dec',
    cantidad: 'Hasta 5 profesores',
    url: 'https://sandbox.flow.cl/btn.php?token=ueppeky',
    // url: 'https://www.flow.cl/btn.php?token=einprk2',
    limite: 5,
  },
  {
    id: 2,
    img: paq3,
    title: 'PRO+',
    price: '$ 169.990 / 6 Meses',
    color: '#FF8A00',
    cantidad: 'Más de 5 profesores',
    url: 'https://sandbox.flow.cl/btn.php?token=ctizoru',
    // url: 'https://www.flow.cl/btn.php?token=yniwtbw',
    limite: false,
  },
  {
    id: 3,
    img: paq0,
    title: 'NONE',
    price: '$0',
    color: '#000',
    cantidad: 'Sin profesores',
    url: '',
    limite: 0,
  },
];
