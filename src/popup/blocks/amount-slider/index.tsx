import { useDebouncedEffect } from '@react-hookz/web'
import { useState, useCallback, FormEvent } from 'react'
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
export const AmountSlider = ({ initial }: Props): JSX.Element => {
  const [amount, setAmount] = useState(initial)

  const onDrag = useCallback((e: FormEvent<HTMLInputElement>) => {
    const amount = +e.currentTarget.value
    setAmount(amount)
  }, [])

  useDebouncedEffect(
    () => {
      storageController.setValue({ amount })
    },
    [amount],
    DEBOUNCE_TIME
  )

  return (
    <Section>
      <Box x={2}>
        <Column>
          <Box bottom={1}>
            <Text>Amount</Text>
          </Box>
          <Slider
            isReverse
            max={1000}
            value={amount}
            min={0.01}
            onDrag={onDrag}
          />
        </Column>
      </Box>
    </Section>
  )
}
