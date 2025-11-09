import { useWindowDimensions } from 'react-native';

// Hook to get responsive spacing values based on screen width
export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isSmall = width < 360;
  const isLarge = width > 820;
  const spacing = (n: number) => Math.round((width / 390) * n); // base on iPhone 12 width ~390
  return { width, height, isSmall, isLarge, spacing };
}
