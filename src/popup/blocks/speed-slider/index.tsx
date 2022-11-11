import { useDebouncedEffect } from '@react-hookz/web'
import { FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { storageController } from '../../../storage'
import { Box } from '../../components/box'
import { Section } from '../../components/section'
import { Slider } from '../../components/slider'
import { Text } from '../../components/text'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; ;
`

const DEBOUNCE_TIME = 100

type Props = {
  initial: number
}
export const SpeedSlider = ({ initial }: Props): JSX.Element => {
  const [speed, setSpeed] = useState(initial)

  const onDrag = useCallback((e: FormEvent<HTMLInputElement>) => {
    const speed = +e.currentTarget.value
    setSpeed(speed)
  }, [])

  useDebouncedEffect(
    () => {
      storageController.setValue({ speed })
    },
    [speed],
    DEBOUNCE_TIME
  )

  return (
    <Section>
      <Box x={2}>
        <Column>
          <Box bottom={1}>
            <Text>Speed</Text>
          </Box>
          <Slider value={speed} max={8} min={0.1} onDrag={onDrag} />
        </Column>
      </Box>
    </Section>
  )
}
