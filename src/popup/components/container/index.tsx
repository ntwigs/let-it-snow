import styled, { CSSProperties } from 'styled-components'

type Props = {
  justifyContent?: CSSProperties['justifyContent']
}

export const Container = styled.main<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
  width: ${({ theme }) => theme.dimensions.width}px;
  height: ${({ theme }) => theme.dimensions.height}px;
  background: ${({ theme }) => theme.color.primary};
`
