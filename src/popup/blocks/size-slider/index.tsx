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
export const SizeSlider = ({ initial }: Props): JSX.Element => {
  const [size, setSize] = useState(initial)

  const onDrag = useCallback((e: FormEvent<HTMLInputElement>) => {
    const size = +e.currentTarget.value
    setSize(size)
  }, [])

  useDebouncedEffect(
    () => {
      storageController.setValue({ size })
    },
    [size],
    DEBOUNCE_TIME
  )

  return (
    <Section>
      <Box x={2}>
        <Column>
          <Box bottom={1}>
            <Text>Size</Text>
          </Box>
          <Slider max={10} value={size} min={2} onDrag={onDrag} />
        </Column>
      </Box>
    </Section>
  )
}
