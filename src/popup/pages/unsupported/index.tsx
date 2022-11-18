import styled from 'styled-components'
import { Header } from '../../blocks/header'
import { Box } from '../../components/box'
import { Container } from '../../components/container'
import { WarningIcon } from '../../components/icon'
import { Text } from '../../components/text'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
`

export const Unsupported = (): JSX.Element => {
  return (
    <Container justifyContent="start">
      <Header title="LET IT SNOW" />
      <Center>
        <Box bottom={2}>
          <WarningIcon />
        </Box>
        <Text align="center">This site is too warm for snow</Text>
        <Text align="center" weight="medium">
          Some sites are unsupported, like the{' '}
          <Text as="span" weight='bold'>extension store</Text>.
        </Text>
        <Text align="center" weight="medium">
          If that’s not the issue - try reloading the page.
        </Text>
      </Center>
    </Container>
  )
}
