const SIZE_BASE = 8
const getSize = (size: number): number => size * SIZE_BASE

export const theme = {
  color: {
    primary: '#01B9DB',
    secondary: '#EAFDFF',
    disabled: '#96AFB8',
    contrast: '#FFFFFF',
  },
  getSize,
  size: {
    large: getSize(3),
    medium: getSize(2),
  },
  dimensions: {
    width: 235,
    height: 377,
  },
}
