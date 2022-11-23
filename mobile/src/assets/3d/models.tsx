import {ViroMaterialDict} from '@viro-community/react-viro/dist/components/Material/ViroMaterials';
import {ImageSourcePropType} from 'react-native';
const Models: {
  // [key: string]: {
  [key: string]: {
    model: ImageSourcePropType;
    type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
    resources: ImageSourcePropType[];
    materials?: ViroMaterialDict;
    materialsOrder?: string[];
    materialChoices?: string[][];
  };
  // };
} = {
  barras: {
    model: require('./diagrama/barras/barras.glb'),
    type: 'GLB',
    resources: [],
  },
  caja_girasol: {
    model: require('./diagrama/caja_girasol/cajas_girasoles.glb'),
    type: 'GLB',
    resources: [],
  },
  caja_iris: {
    model: require('./diagrama/caja_iris/cajas_irises.glb'),
    type: 'GLB',
    resources: [],
  },
  caja_margarita: {
    model: require('./diagrama/caja_margarita/cajas_margaritas.glb'),
    type: 'GLB',
    resources: [],
  },
  pelota: {
    model: require('./diseños/pelota/pelota.glb'),
    type: 'GLB',
    resources: [],
  },
  peluche: {
    model: require('./diseños/peluche/peluche.glb'),
    type: 'GLB',
    resources: [],
  },
  phone: {
    model: require('./diseños/phone/celular.glb'),
    type: 'GLB',
    resources: [],
  },
  pluma: {
    model: require('./diseños/pluma/pluma.glb'),
    type: 'GLB',
    resources: [],
  },
  taza: {
    model: require('./diseños/taza/taza.glb'),
    type: 'GLB',
    resources: [],
  },
  silla: {
    model: require('./diseños/silla/silla.glb'),
    type: 'GLB',
    resources: [],
  },
  mug: {
    model: require('./diseños/mug/mug.glb'),
    type: 'GLB',
    resources: [],
  },
  soda: {
    model: require('./nutricion2/soda/soda.glb'),
    type: 'GLB',
    resources: [],
  },
  galletas: {
    model: require('./nutricion2/galletas/galletas.glb'),
    type: 'GLB',
    resources: [],
  },
  cereal: {
    model: require('./nutricion2/cereal/cereal.glb'),
    type: 'GLB',
    resources: [],
  },
  betelgeuse: {
    model: require('./astronomia2/estrella/betelgeuse.glb'),
    type: 'GLB',
    resources: [],
    // resources: [require('./astronomia2/estrella/betelgeuse.png')],
  },
  rigel: {
    model: require('./astronomia2/estrella/rigel.glb'),
    type: 'GLB',
    resources: [],
    // resources: [require('./astronomia2/estrella/rigel.png')],
  },
  sirius: {
    model: require('./astronomia2/estrella/sirius.glb'),
    type: 'GLB',
    resources: [],
    // resources: [require('./astronomia2/estrella/sirius.png')],
  },
  sun: {
    model: require('./astronomia2/estrella/sun.glb'),
    type: 'GLB',
    resources: [],
    // resources: [require('./astronomia2/estrella/sun.png')],
  },
  mesaDesarmada: {
    model: require('./tecnologicas/mesa/mesa_desarmada.glb'),
    type: 'GLB',
    resources: [],
  },
  mesaArmada: {
    model: require('./tecnologicas/mesa/mesa_armada.glb'),
    type: 'GLB',
    resources: [],
  },
  martilloDesarmado: {
    model: require('./tecnologicas/martillo/martillo_desarmado.glb'),
    type: 'GLB',
    resources: [],
  },
  martilloArmado: {
    model: require('./tecnologicas/martillo/martillo_armado.glb'),
    type: 'GLB',
    resources: [],
  },
  skateDesarmado: {
    model: require('./tecnologicas/skate/skate_desarmado.glb'),
    type: 'GLB',
    resources: [],
  },
  skateArmado: {
    model: require('./tecnologicas/skate/skate_armado.glb'),
    type: 'GLB',
    resources: [],
  },
  organico: {
    model: require('./reciclaje/organico/organic.glb'),
    type: 'GLB',
    resources: [],
  },
  basureroAzul: {
    model: require('./reciclaje/basurero-azul.glb'),
    type: 'GLB',
    resources: [],
  },
  basureroAmarillo: {
    model: require('./reciclaje/basurero-amarillo.glb'),
    type: 'GLB',
    resources: [],
  },
  basureroCafe: {
    model: require('./reciclaje/basurero-cafe.glb'),
    type: 'GLB',
    resources: [],
  },
  basureroGris: {
    model: require('./reciclaje/basurero-gris.glb'),
    type: 'GLB',
    resources: [],
  },
  basureroVerde: {
    model: require('./reciclaje/basurero-verde.glb'),
    type: 'GLB',
    resources: [],
  },
  star: {
    model: require('./astronomia2/estrella/star.obj'),
    type: 'OBJ',
    resources: [],
    materialsOrder: ['Estrella'],
    materialChoices: [['betelgeuse', 'rigel', 'sirius', 'sun']],
    materials: {
      betelgeuse: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/astronomia2/estrella/betelgeuse.png'),
      },
      rigel: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/astronomia2/estrella/rigel.png'),
      },
      sirius: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/astronomia2/estrella/sirius.png'),
      },
      sun: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/astronomia2/estrella/sun.png'),
      },
    },
  },
  caja_torta: {
    model: require('./diseño2/caja_torta/caja-torta.obj'),
    resources: [],
    // resources: [require('./diseño2/caja_torta/caja-torta.mtl')],
    type: 'OBJ',
    materialsOrder: ['Material', 'Logo', 'Etiqueta'],
    materialChoices: [
      ['mat1', 'mat2', 'mat3'],
      ['logo1', 'logo2'],
      ['et1', 'et2'],
    ],
    materials: {
      mat1_default_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1++.png'),
      },
      mat2_default_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2++.png'),
      },
      mat3_default_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3++.png'),
      },
      mat1_logo1_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo1+.png'),
      },
      mat1_logo2_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo2+.png'),
      },
      mat2_logo1_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo1+.png'),
      },
      mat2_logo2_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo2+.png'),
      },
      mat3_logo1_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo1+.png'),
      },
      mat3_logo2_default: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo2+.png'),
      },
      mat1_logo1_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo1+et1.png'),
      },
      mat1_logo2_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo2+et1.png'),
      },
      mat2_logo1_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo1+et1.png'),
      },
      mat2_logo2_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo2+et1.png'),
      },
      mat3_logo1_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo1+et1.png'),
      },
      mat3_logo2_et1: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo2+et1.png'),
      },
      mat1_logo1_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo1+et2.png'),
      },
      mat1_logo2_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat1+logo2+et2.png'),
      },
      mat2_logo1_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo1+et2.png'),
      },
      mat2_logo2_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat2+logo2+et2.png'),
      },
      mat3_logo1_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo1+et2.png'),
      },
      mat3_logo2_et2: {
        lightingModel: 'PBR',
        diffuseTexture: require('../../assets/3d/diseño2/caja_torta/mat3+logo2+et2.png'),
      },
    },
  },
  portal_window_frame: {
    model: require('./portales/portal_window_frame/portal_window_frame.vrx'),
    type: 'VRX',
    resources: [
      require('./portales/portal_window_frame/portal_window_frame_diffuse.png'),
      require('./portales/portal_window_frame/portal_window_frame_normal.png'),
      require('./portales/portal_window_frame/portal_window_frame_specular.png'),
    ],
  },
  grafica: {
    model: require('./informatica2/grafica/gpu-solo.glb'),
    type: 'GLB',
    resources: [],
  },
  grafica_aux: {
    model: require('./informatica2/grafica/gpu-aux.glb'),
    type: 'GLB',
    resources: [],
  },
  ssd: {
    model: require('./informatica2/ssd/ssd-solo.glb'),
    type: 'GLB',
    resources: [],
  },
  ssd_aux: {
    model: require('./informatica2/ssd/ssd-aux.glb'),
    type: 'GLB',
    resources: [],
  },
  teclado: {
    model: require('./informatica2/teclado/teclado-solo.glb'),
    type: 'GLB',
    resources: [],
  },
  teclado_aux: {
    model: require('./informatica2/teclado/teclado-aux.glb'),
    type: 'GLB',
    resources: [],
  },
  auxiliar: {
    model: require('./informatica2/auxiliar.glb'),
    type: 'GLB',
    resources: [],
  },
};

export default Models;
