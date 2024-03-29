import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Box } from '../../components/box'
import { Toggle } from '../../components/toggle'
import { Text } from '../../components/text'
import { Section } from '../../components/section'
import { useDebouncedEffect } from '@react-hookz/web'
import { storageController } from '../../../storage'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; ;
`

const DEBOUNCE_TIME = 10
type Props = {
  initial: boolean
}
export const SnowToggle = ({ initial }: Props): JSX.Element => {
  const [isActive, setActive] = useState(initial)

  const onClick = useCallback(() => {
    setActive((isActive) => !isActive)
  }, [])

  useDebouncedEffect(
    () => {
      storageController.setValue({ isActive })
    },
    [isActive],
    DEBOUNCE_TIME
  )

  return (
    <Section>
      <Box x={2} top={4} bottom={1}>
        <Row>
          <Text>{isActive ? `It's snowing` : `No snow`}</Text>
          <Toggle isActive={isActive} onClick={onClick} />
        </Row>
      </Box>
    </Section>
  )
}
