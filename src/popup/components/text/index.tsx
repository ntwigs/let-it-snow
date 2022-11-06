import styled, { DefaultTheme, ThemeProps } from 'styled-components'

type Props = {
  size?: keyof DefaultTheme['size']
  color?: keyof DefaultTheme['color']
}

export const Text = styled.p<Props>`
  font-family: 'Nunito', sans-serif;
  font-size: ${({ theme, size = 'medium' }) => theme.size[size]}px;
  color: ${({ theme, color = 'contrast' }) => theme.color[color]};
`
