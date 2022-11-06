import { FormEvent } from 'react'
import styled from 'styled-components'

const RANGE_PADDING = 2

type Reverse = {
  isReverse?: boolean
}
const Container = styled.div<Reverse>`
  width: calc(100% - RANGE_PADDING * 2 px);
  height: ${({ theme }) => theme.getSize(3)}px;
  border-radius: ${({ theme }) => theme.getSize(2)}px;
  background: ${({ theme }) => theme.color.secondary};
  transform: rotateY(${({ isReverse }) => (isReverse ? 180 : 0)}deg);
  padding: 0 ${RANGE_PADDING}px;

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    background-color: ${({ theme }) => theme.color.primary};
    height: ${({ theme }) => theme.getSize(2.5)}px;
    width: ${({ theme }) => theme.getSize(2.5)}px;
    border-radius: ${({ theme }) => theme.getSize(2.5)}px;
  }
`

type Props = Reverse & {
  min?: number
  max?: number
  value: number
  onDrag: (event: FormEvent<HTMLInputElement>) => void
}
export const Slider = ({
  min = 0,
  max = 100,
  value,
  onDrag,
  isReverse,
}: Props): JSX.Element => {
  return (
    <Container isReverse={isReverse}>
      <input
        type="range"
        step="0.01"
        min={min}
        max={max}
        value={value}
        onInput={onDrag}
      />
    </Container>
  )
}
