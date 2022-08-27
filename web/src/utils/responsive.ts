import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}
export default function RSize(size: number, dimension: 'w' | 'h' = 'w') {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { height, width } = windowDimensions;

  return Math.round((dimension === 'w' ? width : height) * size);
}
