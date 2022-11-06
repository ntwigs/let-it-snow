import styled from 'styled-components'

type Props = {
  top: number
  t: number
  left: number
  l: number
  right: number
  r: number
  bottom: number
  b: number
  padding: number
  x: number
  y: number
}

export const Box = styled.div<Partial<Props>>(
  ({ theme, top }) => top && { paddingTop: theme.getSize(top) },
  ({ theme, t }) => t && { paddingTop: theme.getSize(t) },
  ({ theme, left }) => left && { paddingLeft: theme.getSize(left) },
  ({ theme, l }) => l && { paddingLeft: theme.getSize(l) },
  ({ theme, right }) => right && { paddingRight: theme.getSize(right) },
  ({ theme, r }) => r && { paddingRight: theme.getSize(r) },
  ({ theme, bottom }) => bottom && { paddingBottom: theme.getSize(bottom) },
  ({ theme, b }) => b && { paddingBottom: theme.getSize(b) },
  ({ theme, padding }) => padding && { padding: theme.getSize(padding) },
  ({ theme, x }) =>
    x && { paddingLeft: theme.getSize(x), paddingRight: theme.getSize(x) },
  ({ theme, y }) =>
    y && { paddingTop: theme.getSize(y), paddingBottom: theme.getSize(y) }
)
