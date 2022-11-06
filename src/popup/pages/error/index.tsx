import { Header } from '../../blocks/header'
import { Container } from '../../components/container'
import { Text } from '../../components/text'

export const Error = (): JSX.Element => {
  return (
    <Container>
      <Header title="LET IT SNOW" />
      {/* <Icon type="warning" /> */}
      <Text>This site is too warm for snow</Text>
    </Container>
  )
}
