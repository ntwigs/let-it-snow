import styled from 'styled-components'
import { Header } from '../../blocks/header'
import { Container } from '../../components/container'
import { Text } from '../../components/text'

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
export const Unsupported = (): JSX.Element => {
  return (
    <Container justifyContent="start">
      <Header title="LET IT SNOW" />
      {/* <Icon type="warning" /> */}
      <Flex>
        <Text align="center">This site is too warm for snow</Text>
      </Flex>
    </Container>
  )
}
