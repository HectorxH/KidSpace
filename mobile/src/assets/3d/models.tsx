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
    resources: [],
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
