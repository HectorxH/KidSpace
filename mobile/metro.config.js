/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    assetExts: [
      'obj',
      'OBJ',
      'vrx',
      'mtl',
      'jpg',
      'JPG',
      'png',
      'PNG',
      'gltf',
      'GLTF',
      'glb',
      'GLB',
      'bin',
      'arobject',
      'hdr'
    ]
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
