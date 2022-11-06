import styled from 'styled-components'

type ActiveProps = {
  isActive: boolean
}
const Container = styled.div<ActiveProps>`
  width: ${({ theme }) => theme.getSize(6)}px;
  height: ${({ theme }) => theme.getSize(3)}px;
  border-radius: ${({ theme }) => theme.getSize(6)}px;
  background: ${({ theme }) => theme.color.secondary};
  display: flex;
  justify-content: ${({ isActive }) => (isActive ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
`

const Indicator = styled.div<ActiveProps>`
  width: ${({ theme }) => theme.getSize(2.5)}px;
  height: ${({ theme }) => theme.getSize(2.5)}px;
  border-radius: ${({ theme }) => theme.getSize(2.5)}px;
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.primary : theme.color.disabled};
`

type Props = ActiveProps & {
  onClick: () => void
}
export const Toggle = ({ isActive, onClick }: Props): JSX.Element => {
  return (
    <Container isActive={isActive} onClick={onClick}>
      <Indicator isActive={isActive} />
    </Container>
  )
}
