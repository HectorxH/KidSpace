import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export function RSize(size: number, dimension: 'w' | 'h' = 'w') {
  return Math.round((dimension === 'w' ? width : height) * size);
}

// No nos importa esto

// Although dimensions are available immediately, they may change
// (e.g due to device rotation, foldable devices etc) so any rendering logic or
// styles that depend on these constants should try to call this function on every render,
// rather than caching the value (for example, using inline styles rather than setting a
// value in a StyleSheet).

// export class ResponsiveSize {
//   width: number;
//   height: number;

//   constructor({width, height}: ScaledSize) {
//     this.width = width;
//     this.height = height;
//   }

//   get(size: number, dimension: 'w' | 'h' = 'w') {
//     return Math.round((dimension === 'w' ? this.width : this.height) * size);
//   }
// }
