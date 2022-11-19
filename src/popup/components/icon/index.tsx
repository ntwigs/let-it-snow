import styled from 'styled-components'
import warningIcon from '../../assets/warning-icon.svg'

const Icon = styled.img`
  width: ${({ theme }) => theme.getSize(8)}px;
  height: ${({ theme }) => theme.getSize(8)}px;
  aspect-ratio: 1;
`

export const WarningIcon = () => <Icon src={warningIcon} alt="warning" />
