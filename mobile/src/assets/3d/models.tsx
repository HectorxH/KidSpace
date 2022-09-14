import {ViroMaterialDict} from '@viro-community/react-viro/dist/components/Material/ViroMaterials';
import {ImageSourcePropType} from 'react-native';
const Models: {
  [key: string]: {
    [key: string]: {
      model: ImageSourcePropType;
      type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
      resources: ImageSourcePropType[];
      materials?: ViroMaterialDict;
      materialsOrder?: string[];
      materialChoices?: string[][];
    };
  };
} = {
  debug: {
    barras: {
      model: require('./diagrama/libro/modelo-libro.obj'),
      type: 'OBJ',
      resources: [require('./diagrama/libro/modelo-libro.mtl')],
      materialsOrder: ['color', 'cover'],
      materialChoices: [
        ['azul', 'rosado'],
        ['quijote', 'rayuela', 'tensura'],
      ],
      materials: {
        default: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/default/default.png'),
        },
        default_quijote: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/default/default_quijote.png'),
        },
        default_rayuela: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/default/default_rayuela.png'),
        },
        default_tensura: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/default/default_tensura.png'),
        },
        azul_default: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/azul/azul.png'),
        },
        rosado_default: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/rosado/rosado.png'),
        },
        azul_quijote: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/azul/azul_quijote.png'),
        },
        azul_tensura: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/azul/azul_tensura.png'),
        },
        azul_rayuela: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/azul/azul_rayuela.png'),
        },
        rosado_quijote: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/rosado/rosado_quijote.png'),
        },
        rosado_rayuela: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/rosado/rosado_rayuela.png'),
        },
        rosado_tensura: {
          lightingModel: 'PBR',
          diffuseTexture: require('../../assets/3d/diagrama/libro/rosado/rosado_tensura.png'),
        },
      },
    },
    barras_: {
      model: require('./diagrama/barras/barras.glb'),
      type: 'GLB',
      resources: [],
    },
  },
  diagramas: {
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
  },
  diseños: {
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
  },
  nutricion2: {
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
  },
  diseño1: {
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
      resources: [],
      type: 'GLB',
    },
  },
  diseño2: {
    caja_torta: {
      model: require('./diseño2/caja_torta/caja-torta.obj'),
      resources: [require('./diseño2/caja_torta/caja-torta.mtl')],
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
  },
  nutricion1: {
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
  },
};

export default Models;
