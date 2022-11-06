import { useMountEffect } from '@react-hookz/web'
import { useState } from 'react'
import { AmountSlider } from '../../blocks/amount-slider'
import { Header } from '../../blocks/header'
import { SizeSlider } from '../../blocks/size-slider'
import { SnowToggle } from '../../blocks/snow-toggle'
import { SpeedSlider } from '../../blocks/speed-slider'
import { Container } from '../../components/container'
import { Error } from '../error'

type DefaultData = {
  amount: number
  size: number
  speed: number
  isActive: boolean
}

const useInitialValues = () => {
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [initialValues, setInitialValues] = useState<DefaultData>(
    {} as DefaultData
  )

  useMountEffect(() => {
    const getValues = async () => {
      try {
        const storedValues = (await chrome.storage.local.get([
          'amount',
          'size',
          'speed',
          'isActive',
        ])) as DefaultData

        setInitialValues(storedValues)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getValues()
  })

  return {
    isLoading,
    isError,
    initialValues,
  }
}

export const Start = (): JSX.Element | null => {
  const { isError, isLoading, initialValues } = useInitialValues()

  if (isLoading) return null
  if (isError) return <Error />

  const { amount, isActive, size, speed } = initialValues

  return (
    <Container>
      <Header title="LET IT SNOW" />
      <AmountSlider initial={amount} />
      <SizeSlider initial={size} />
      <SpeedSlider initial={speed} />
      <SnowToggle initial={isActive} />
    </Container>
  )
}
