import styled from 'styled-components'
export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: ${({ theme }) => theme.dimensions.width}px;
  height: ${({ theme }) => theme.dimensions.height}px;
  background: ${({ theme }) => theme.color.primary};
`
