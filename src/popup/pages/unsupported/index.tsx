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
        <WarningIcon />
        <Box x={2}>
          <Box y={2}>
            <Text align="center">This site is too hot for snow</Text>
          </Box>
          <Box bottom={2}>
            <Text align="center" weight="medium" size="small">
              Some sites are unsupported, like the{' '}
              <Text as="span" weight="bold" size="small">
                extension store
              </Text>
              .
            </Text>
          </Box>
          <Text size="small" align="center" weight="medium">
            If that’s not the issue - try reloading the page.
          </Text>
        </Box>
      </Center>
    </Container>
  )
}
