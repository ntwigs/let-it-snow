import styled, {
  CSSProperties,
  DefaultTheme,
} from 'styled-components'

type Props = {
  size?: keyof DefaultTheme['size']
  color?: keyof DefaultTheme['color']
  align?: CSSProperties['textAlign']
}

export const Text = styled.p<Props>`
  font-family: 'Nunito', sans-serif;
  font-size: ${({ theme, size = 'medium' }) => theme.size[size]}px;
  color: ${({ theme, color = 'contrast' }) => theme.color[color]};
  text-align: ${({ align = 'left' }) => align};
`
